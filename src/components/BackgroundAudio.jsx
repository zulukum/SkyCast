import React, { useEffect, useRef, useState } from 'react'
import musicFile from '../assets/Weather-Music-01.mp3'

export default function BackgroundAudio() {
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const sourceRef = useRef(null)
  const gainRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContext()
      ctxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.value = 0.06
      gain.connect(ctx.destination)
      gainRef.current = gain

      const audio = new Audio(musicFile)
      audio.loop = true
      audio.volume = 0.9
      audioRef.current = audio

      const tryStart = async () => {
        try {
          if (ctx.state === 'suspended') await ctx.resume()
          // connect media element to audio context for consistent volume control
          const source = ctx.createMediaElementSource(audio)
          source.connect(gain)
          sourceRef.current = source
          await audio.play()
          setPlaying(true)
        } catch (err) {
          // autoplay blocked, leave UI to let user start
          setBlocked(true)
          setPlaying(false)
        }
      }

      tryStart()

      return () => {
        try {
          audio.pause()
          audioRef.current = null
          if (sourceRef.current) sourceRef.current.disconnect()
          if (ctxRef.current) ctxRef.current.close()
        } catch (e) {}
      }
    } catch (e) {
      setBlocked(true)
    }
  }, [])

  const handlePlay = async () => {
    try {
      if (ctxRef.current && ctxRef.current.state === 'suspended') await ctxRef.current.resume()
      if (audioRef.current) await audioRef.current.play()
      setPlaying(true)
      setBlocked(false)
    } catch (e) {
      setBlocked(true)
    }
  }

  const handlePause = () => {
    try {
      if (audioRef.current) audioRef.current.pause()
      setPlaying(false)
    } catch (e) {}
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) audioRef.current.volume = vol
    if (muted) setMuted(false)
  }

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? volume : 0
      setMuted(!muted)
    }
  }

  return (
    <div>
      <div style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 9999 }}>
        <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <button aria-label={muted ? 'Unmute' : 'Mute'} onClick={handleMute} className="text-white text-lg">{muted ? '🔈' : '🔊'}</button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume control"
              className="w-24 h-1 bg-white/20 rounded-full cursor-pointer"
            />
            <span className="text-xs text-white/60 w-8">{Math.round((muted ? 0 : volume) * 100)}%</span>
          </div>
          {playing ? (
            <button aria-label="Pause background music" onClick={handlePause} className="px-3 py-2 rounded-[10rem] bg-white/10 text-white text-sm">🎵 Pause</button>
          ) : (
            <button aria-label="Play background music" onClick={handlePlay} className="px-3 py-2 rounded-[10rem] bg-white/10 text-white text-sm">🎶 Play</button>
          )}
          {blocked && <div role="status" className="text-xs text-red-400">Autoplay blocked — click to enable</div>}
        </div>
      </div>
    </div>
  )
}