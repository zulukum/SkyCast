
const newsData = [
  {
    id: 1,
    title: 'Severe Thunderstorm Warning Issued',
    date: '2026-06-15',
    category: 'Alerts',
    summary: 'A severe thunderstorm warning has been issued for parts of the region with heavy rain and gusty winds expected.',
    content:
      'Meteorologists warn of strong gusts and frequent lightning across the area. Residents should secure outdoor items, avoid travel where possible, and follow updates from local authorities. Expect localized power outages and tree damage in exposed locations.',
    link: '#'
  },
  {
    id: 2,
    title: 'Heat Advisory in Effect This Week',
    date: '2026-06-14',
    category: 'Advisory',
    summary: 'Temperatures are forecasted to rise above normal; stay hydrated and limit outdoor exposure during peak hours.',
    content:
      'Highs will reach the mid to upper 30s Celsius in many areas, increasing heat-related illness risk. Stay in shaded or air-conditioned places during midday, drink water frequently, and check on vulnerable neighbors and pets.',
    link: '#'
  },
  {
    id: 3,
    title: 'Localized Flooding After Overnight Rains',
    date: '2026-06-13',
    category: 'Local',
    summary: 'Urban areas reported standing water on several streets; minor road closures were put in place.',
    content:
      'Following intense overnight downpours, drainage systems overflowed in low-lying neighborhoods. Crews are on site to clear blockages and reopen affected roads. Drivers should avoid flooded streets and follow detours.',
    link: '#'
  },
  {
    id: 4,
    title: 'Air Quality Improves After Rain',
    date: '2026-06-12',
    category: 'Environment',
    summary: 'Air quality indices fell to healthier levels after yesterday’s storm system cleared particulates.',
    content:
      'The rain helped wash out airborne particulates and pollutants, resulting in significantly lower AQI readings. Sensitive groups should still monitor local advisories, but outdoor conditions are generally improved.',
    link: '#'
  },
  {
    id: 5,
    title: 'Tornado Watch Issued for Northern Counties',
    date: '2026-06-11',
    category: 'Alerts',
    summary: 'Conditions are favorable for tornado development; residents should stay alert and have a safety plan.',
    content:
      'A tornado watch means that tornadoes are possible in the area. Stay tuned to weather updates, have a designated shelter area ready, and avoid windows during severe weather. If a warning is issued, take immediate action to protect yourself.',
    link: '#'
  },
  {
    id: 6,
    title: 'Drought Conditions Persist in Southern Regions',
    date: '2026-06-10',
    category: 'Environment',
    summary: 'Lack of rainfall has led to ongoing drought conditions; water restrictions may be implemented.',
    content:
      'Southern areas continue to experience below-average precipitation, leading to dry soil and stressed vegetation. Authorities are monitoring conditions closely and may enforce water use restrictions if the drought worsens.',
    link: '#'
  },
  {
    id: 7,
    title: 'Winter Storm Expected to Bring Snow and Ice',
    date: '2026-06-09',
    category: 'Forecast',
    summary: 'A winter storm is forecasted to impact the region with snow, ice, and hazardous travel conditions.',
    content:
      'The storm system will bring a mix of snow and freezing rain, leading to slick roads and reduced visibility. Travelers should plan for extra time, consider postponing non-essential trips, and keep an emergency kit in their vehicles.',
    link: '#'
  },
  {
    id: 8,
    title: 'Local Community Event Announced',
    date: '2026-06-08',
    category: 'Community',
    summary: 'A local community event is being organized to bring residents together and celebrate the area’s culture.',
    content:
      'The event will feature live music, food vendors, and activities for all ages. It aims to strengthen community bonds and highlight local talent. Residents are encouraged to attend and participate.',
    link: '#'
  },
  {
    id: 9,
    title: 'Climate Change Impact on Local Weather Patterns',
    date: '2026-06-06',
    category: 'Environment',
    summary: 'A recent study highlights how climate change is affecting local weather patterns, leading to more extreme events.',
    content: 'The study found that rising global temperatures are contributing to increased frequency and intensity of storms, heatwaves, and droughts in the region. Researchers emphasize the importance of mitigation efforts to reduce greenhouse gas emissions.',
    link: '#'
  },
  {
    id: 10,
    title: 'New Weather App Launches with Hyper-Local Forecasts',
    date: '2026-06-07',
    category: 'Technology',
    summary: 'A new weather app has been launched that provides hyper-local forecasts and real-time updates.',
    content:
      'The app uses advanced algorithms and data from local weather stations to deliver accurate forecasts down to the neighborhood level. It also includes features like severe weather alerts, radar maps, and personalized notifications.',
    link: '#'
  },{
    id: 11,
    title: 'Severe Thunderstorm Warning Issued',
    date: '2026-06-15',
    category: 'Alerts',
    summary: 'A severe thunderstorm warning has been issued for parts of the region with heavy rain and gusty winds expected.',
    content:
      'Meteorologists warn of strong gusts and frequent lightning across the area. Residents should secure outdoor items, avoid travel where possible, and follow updates from local authorities. Expect localized power outages and tree damage in exposed locations.',
    link: '#'
  },
  {
    id: 12,
    title: 'Heat Advisory in Effect This Week',
    date: '2026-06-14',
    category: 'Advisory',
    summary: 'Temperatures are forecasted to rise above normal; stay hydrated and limit outdoor exposure during peak hours.',
    content:
      'Highs will reach the mid to upper 30s Celsius in many areas, increasing heat-related illness risk. Stay in shaded or air-conditioned places during midday, drink water frequently, and check on vulnerable neighbors and pets.',
    link: '#'
  },
  {
    id: 13,
    title: 'Localized Flooding After Overnight Rains',
    date: '2026-06-13',
    category: 'Local',
    summary: 'Urban areas reported standing water on several streets; minor road closures were put in place.',
    content:
      'Following intense overnight downpours, drainage systems overflowed in low-lying neighborhoods. Crews are on site to clear blockages and reopen affected roads. Drivers should avoid flooded streets and follow detours.',
    link: '#'
  },
  {
    id: 14,
    title: 'Air Quality Improves After Rain',
    date: '2026-06-12',
    category: 'Environment',
    summary: 'Air quality indices fell to healthier levels after yesterday’s storm system cleared particulates.',
    content:
      'The rain helped wash out airborne particulates and pollutants, resulting in significantly lower AQI readings. Sensitive groups should still monitor local advisories, but outdoor conditions are generally improved.',
    link: '#'
  },
  {
    id: 15,
    title: 'Tornado Watch Issued for Northern Counties',
    date: '2026-06-11',
    category: 'Alerts',
    summary: 'Conditions are favorable for tornado development; residents should stay alert and have a safety plan.',
    content:
      'A tornado watch means that tornadoes are possible in the area. Stay tuned to weather updates, have a designated shelter area ready, and avoid windows during severe weather. If a warning is issued, take immediate action to protect yourself.',
    link: '#'
  },
  {
    id: 16,
    title: 'Drought Conditions Persist in Southern Regions',
    date: '2026-06-10',
    category: 'Environment',
    summary: 'Lack of rainfall has led to ongoing drought conditions; water restrictions may be implemented.',
    content:
      'Southern areas continue to experience below-average precipitation, leading to dry soil and stressed vegetation. Authorities are monitoring conditions closely and may enforce water use restrictions if the drought worsens.',
    link: '#'
  },
  {
    id: 17,
    title: 'Winter Storm Expected to Bring Snow and Ice',
    date: '2026-06-09',
    category: 'Forecast',
    summary: 'A winter storm is forecasted to impact the region with snow, ice, and hazardous travel conditions.',
    content:
      'The storm system will bring a mix of snow and freezing rain, leading to slick roads and reduced visibility. Travelers should plan for extra time, consider postponing non-essential trips, and keep an emergency kit in their vehicles.',
    link: '#'
  },
  {
    id: 18,
    title: 'Local Community Event Announced',
    date: '2026-06-08',
    category: 'Community',
    summary: 'A local community event is being organized to bring residents together and celebrate the area’s culture.',
    content:
      'The event will feature live music, food vendors, and activities for all ages. It aims to strengthen community bonds and highlight local talent. Residents are encouraged to attend and participate.',
    link: '#'
  },
  {
    id: 19,
    title: 'Climate Change Impact on Local Weather Patterns',
    date: '2026-06-06',
    category: 'Environment',
    summary: 'A recent study highlights how climate change is affecting local weather patterns, leading to more extreme events.',
    content: 'The study found that rising global temperatures are contributing to increased frequency and intensity of storms, heatwaves, and droughts in the region. Researchers emphasize the importance of mitigation efforts to reduce greenhouse gas emissions.',
    link: '#'
  },
  {
    id: 20,
    title: 'New Weather App Launches with Hyper-Local Forecasts',
    date: '2026-06-07',
    category: 'Technology',
    summary: 'A new weather app has been launched that provides hyper-local forecasts and real-time updates.',
    content:
      'The app uses advanced algorithms and data from local weather stations to deliver accurate forecasts down to the neighborhood level. It also includes features like severe weather alerts, radar maps, and personalized notifications.',
    link: '#'
  },
  {
    id: 21,
    title: 'Severe Thunderstorm Warning Issued',
    date: '2026-06-15',
    category: 'Alerts',
    summary: 'A severe thunderstorm warning has been issued for parts of the region with heavy rain and gusty winds expected.',
    content:
      'Meteorologists warn of strong gusts and frequent lightning across the area. Residents should secure outdoor items, avoid travel where possible, and follow updates from local authorities. Expect localized power outages and tree damage in exposed locations.',
    link: '#'
  },
  {
    id: 22,
    title: 'Heat Advisory in Effect This Week',
    date: '2026-06-14',
    category: 'Advisory',
    summary: 'Temperatures are forecasted to rise above normal; stay hydrated and limit outdoor exposure during peak hours.',
    content:
      'Highs will reach the mid to upper 30s Celsius in many areas, increasing heat-related illness risk. Stay in shaded or air-conditioned places during midday, drink water frequently, and check on vulnerable neighbors and pets.',
    link: '#'
  },
  {
    id: 23,
    title: 'Localized Flooding After Overnight Rains',
    date: '2026-06-13',
    category: 'Local',
    summary: 'Urban areas reported standing water on several streets; minor road closures were put in place.',
    content:
      'Following intense overnight downpours, drainage systems overflowed in low-lying neighborhoods. Crews are on site to clear blockages and reopen affected roads. Drivers should avoid flooded streets and follow detours.',
    link: '#'
  },
  {
    id: 24,
    title: 'Air Quality Improves After Rain',
    date: '2026-06-12',
    category: 'Environment',
    summary: 'Air quality indices fell to healthier levels after yesterday’s storm system cleared particulates.',
    content:
      'The rain helped wash out airborne particulates and pollutants, resulting in significantly lower AQI readings. Sensitive groups should still monitor local advisories, but outdoor conditions are generally improved.',
    link: '#'
  },
  {
    id: 25,
    title: 'Tornado Watch Issued for Northern Counties',
    date: '2026-06-11',
    category: 'Alerts',
    summary: 'Conditions are favorable for tornado development; residents should stay alert and have a safety plan.',
    content:
      'A tornado watch means that tornadoes are possible in the area. Stay tuned to weather updates, have a designated shelter area ready, and avoid windows during severe weather. If a warning is issued, take immediate action to protect yourself.',
    link: '#'
  },
  {
    id: 26,
    title: 'Drought Conditions Persist in Southern Regions',
    date: '2026-06-10',
    category: 'Environment',
    summary: 'Lack of rainfall has led to ongoing drought conditions; water restrictions may be implemented.',
    content:
      'Southern areas continue to experience below-average precipitation, leading to dry soil and stressed vegetation. Authorities are monitoring conditions closely and may enforce water use restrictions if the drought worsens.',
    link: '#'
  },
  {
    id: 27,
    title: 'Winter Storm Expected to Bring Snow and Ice',
    date: '2026-06-09',
    category: 'Forecast',
    summary: 'A winter storm is forecasted to impact the region with snow, ice, and hazardous travel conditions.',
    content:
      'The storm system will bring a mix of snow and freezing rain, leading to slick roads and reduced visibility. Travelers should plan for extra time, consider postponing non-essential trips, and keep an emergency kit in their vehicles.',
    link: '#'
  },
  {
    id: 28,
    title: 'Local Community Event Announced',
    date: '2026-06-08',
    category: 'Community',
    summary: 'A local community event is being organized to bring residents together and celebrate the area’s culture.',
    content:
      'The event will feature live music, food vendors, and activities for all ages. It aims to strengthen community bonds and highlight local talent. Residents are encouraged to attend and participate.',
    link: '#'
  },
  {
    id: 29,
    title: 'Climate Change Impact on Local Weather Patterns',
    date: '2026-06-06',
    category: 'Environment',
    summary: 'A recent study highlights how climate change is affecting local weather patterns, leading to more extreme events.',
    content: 'The study found that rising global temperatures are contributing to increased frequency and intensity of storms, heatwaves, and droughts in the region. Researchers emphasize the importance of mitigation efforts to reduce greenhouse gas emissions.',
    link: '#'
  },
  {
    id: 30,
    title: 'New Weather App Launches with Hyper-Local Forecasts',
    date: '2026-06-07',
    category: 'Technology',
    summary: 'A new weather app has been launched that provides hyper-local forecasts and real-time updates.',
    content:
      'The app uses advanced algorithms and data from local weather stations to deliver accurate forecasts down to the neighborhood level. It also includes features like severe weather alerts, radar maps, and personalized notifications.',
    link: '#'
  },
]

export default newsData
