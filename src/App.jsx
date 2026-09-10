import { useState } from 'react'
import './App.css'

const stations = [
  'Kashmere Gate',
  'Rajiv Chowk',
  'New Delhi',
  'Hauz Khas',
  'Central Secretariat',
  'Mandi House',
  'Lajpat Nagar',
  'Botanical Garden',
]

const routeData = {
  'Kashmere Gate-Hauz Khas': {
    time: 29,
    fare: 40,
    stops: 9,
    interchange: 0,
    steps: [
      { station: 'Kashmere Gate', line: 'Yellow Line', color: '#f5c518' },
      { station: 'New Delhi', line: 'Yellow Line', color: '#f5c518' },
      { station: 'Rajiv Chowk', line: 'Yellow Line', color: '#f5c518' },
      { station: 'Central Secretariat', line: 'Yellow Line', color: '#f5c518' },
      { station: 'Hauz Khas', line: 'Yellow Line', color: '#f5c518' },
    ],
  },
  'Rajiv Chowk-Botanical Garden': {
    time: 38,
    fare: 50,
    stops: 14,
    interchange: 0,
    steps: [
      { station: 'Rajiv Chowk', line: 'Blue Line', color: '#2463ad' },
      { station: 'Mandi House', line: 'Blue Line', color: '#2463ad' },
      { station: 'Yamuna Bank', line: 'Blue Line', color: '#2463ad' },
      { station: 'Noida Sector 18', line: 'Blue Line', color: '#2463ad' },
      { station: 'Botanical Garden', line: 'Blue Line', color: '#2463ad' },
    ],
  },
  'New Delhi-Lajpat Nagar': {
    time: 31,
    fare: 40,
    stops: 8,
    interchange: 1,
    steps: [
      { station: 'New Delhi', line: 'Yellow Line', color: '#f5c518' },
      { station: 'Central Secretariat', line: 'Yellow Line', color: '#f5c518' },
      { station: 'Change at Central Secretariat', line: 'Violet Line', color: '#7d3f98' },
      { station: 'Mandi House', line: 'Violet Line', color: '#7d3f98' },
      { station: 'Lajpat Nagar', line: 'Violet Line', color: '#7d3f98' },
    ],
  },
}

function TrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="2" width="14" height="17" rx="4" />
      <path d="M8 22l2-3m6 3-2-3M8 7h8M8 12h.01M16 12h.01" />
    </svg>
  )
}

function App() {
  const [from, setFrom] = useState('Kashmere Gate')
  const [to, setTo] = useState('Hauz Khas')
  const [route, setRoute] = useState(null)
  const [routeFrom, setRouteFrom] = useState('')
  const [routeTo, setRouteTo] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const findRoute = () => {
    setError('')
    try {
      const result = routeData[`${from}-${to}`]
      setRoute(result.details.route)
      setRouteFrom(from)
      setRouteTo(to)
      setMessage(result ? '' : 'No direct mock route found. Try one of the popular routes below.')
    } catch (routeError) {
      setRoute(null)
      setError(routeError.message)
    }
  }

  const selectPopularRoute = (origin, destination) => {
    setFrom(origin)
    setTo(destination)
    setRoute(routeData[`${origin}-${destination}`])
    setRouteFrom(origin)
    setRouteTo(destination)
    setMessage('')
    setError('')
  }

  const swapStations = () => {
    setFrom(to)
    setTo(from)
    setError('')
  }

  return (
    <div className="app">
      <header className="nav">
        <a className="brand" href="/">
          <span className="brand-icon"><TrainIcon /></span>
          <span>Delhi<span>Metro</span></span>
        </a>
        <nav aria-label="Main navigation">
          <a className="active" href="#route">Route finder</a>
          <a href="#popular">Popular routes</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="route">
          <div className="eyebrow"><span /> Delhi Metro route planner</div>
          <h1>Your quickest way<br />across <em>Delhi.</em></h1>
          <p>Plan your journey, check fares, and see every stop along the way.</p>

          <form className="route-form">
            <label>
              <span>From</span>
              <select value={from} onChange={(event) => setFrom(event.target.value)}>
                {stations.map((station) => <option key={station}>{station}</option>)}
              </select>
            </label>

            <button className="swap" type="button" onClick={swapStations} aria-label="Swap stations">⇄</button>

            <label>
              <span>To</span>
              <select value={to} onChange={(event) => setTo(event.target.value)}>
                {stations.map((station) => <option key={station}>{station}</option>)}
              </select>
            </label>

            <button className="find-button" type="button" onClick={findRoute}>
              Find route <span>→</span>
            </button>
          </form>
        </section>

        <section className="result-section" aria-live="polite">
          {error && (
            <div className="error-panel" role="alert">
              <span className="error-icon">!</span>
              <div>
                <strong>Something went wrong</strong>
                <p>{error}</p>
              </div>
            </div>
          )}
          {message && <div className="message">{message}</div>}
          {route && (
            <article className="route-card">
              <div className="summary">
                <div>
                  <span className="summary-label">Estimated time</span>
                  <strong>{route.time}<small> min</small></strong>
                </div>
                <div>
                  <span className="summary-label">Fare</span>
                  <strong><small>₹</small>{route.fare}</strong>
                </div>
                <div>
                  <span className="summary-label">Stations</span>
                  <strong>{route.stops}</strong>
                </div>
                <div>
                  <span className="summary-label">Interchanges</span>
                  <strong>{route.interchange}</strong>
                </div>
              </div>

              <div className="journey">
                <div className="journey-heading">
                  <div>
                    <span>Your journey</span>
                    <h2>{routeFrom} <b>→</b> {routeTo}</h2>
                  </div>
                  <span className="service-status"><i /> Normal service</span>
                </div>

                <ol className="stops">
                  {route.steps.map((step, index) => (
                    <li key={step.station}>
                      <span className="stop-marker" style={{ '--line-color': step.color }}>
                        {index === 0 || index === route.steps.length - 1 ? <TrainIcon /> : ''}
                      </span>
                      <div>
                        <strong>{step.station}</strong>
                        <span>{step.line}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          )}
        </section>

        <section className="popular" id="popular">
          <div>
            <span className="section-kicker">Quick picks</span>
            <h2>Popular routes</h2>
          </div>
          <div className="route-list">
            {Object.keys(routeData).map((key) => {
              const [origin, destination] = key.split('-')
              return (
                <button key={key} onClick={() => selectPopularRoute(origin, destination)}>
                  <span>{origin}</span>
                  <b>→</b>
                  <span>{destination}</span>
                </button>
              )
            })}
          </div>
        </section>
      </main>

      <footer id="about">
        <span><TrainIcon /> DelhiMetro</span>
        <p>Demo journey data only · Not affiliated with DMRC</p>
      </footer>
    </div>
  )
}

export default App
