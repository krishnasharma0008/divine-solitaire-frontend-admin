import { useState, useEffect } from 'react'

const ExchangeRateIcon = () => {
  const [iconColor, setIconColor] = useState('currentColor')

  useEffect(() => {
    const container = document.getElementById('icon-container')
    if (container) {
      const backgroundColor = window.getComputedStyle(container).backgroundColor

      // Determine contrast to set appropriate icon color
      const isDarkBackground = isDark(backgroundColor)

      // Set icon color based on background color
      setIconColor(isDarkBackground ? '#FFFFFF' : '#000000')
    }
  }, [])

  // Function to determine if background color is dark or light
  const isDark = (color: string) => {
    const rgb = color.match(/\d+/g)
    const brightness = (parseInt(rgb![0]) * 299 + parseInt(rgb![1]) * 587 + parseInt(rgb![2]) * 114) / 1000
    return brightness < 128
  }

  return (
    <div id="icon-container" className="w-6 h-6">
      <svg
        //className="w-6 h-6 text-gray-800 dark:text-white"
        className={`w-6 h-6 text-${iconColor}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
        />
      </svg>
    </div>
  )
}

export default ExchangeRateIcon
