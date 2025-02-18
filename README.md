[![Netlify Status](https://api.netlify.com/api/v1/badges/4c6cd9c1-dd8c-4b82-a6be-bc7a57e804c4/deploy-status)](https://app.netlify.com/sites/prinnyexperience/deploys)
# Prinny Experience

A modern web application for discovering and booking local tours and experiences in Watford and the surrounding towns. Built with React, TypeScript, and Tailwind CSS.

![image](https://github.com/user-attachments/assets/e08b5719-5af6-49d3-a60d-8e322b3b7daa)



## Features

- **Browse Experiences**: View a curated list of local tours and experiences
- **Advanced Filtering**: Filter experiences by:
  - Price range
  - Duration
  - Category
  - Search text
- **Wishlist**: Save favorite experiences for later
- **Booking System**: Easy-to-use booking form with:
  - Instant confirmation
  - Multiple traveler options
  - Special requirements handling
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Form Handling**: Formspree
- **Testing**: Jest & React Testing Library
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/watford-tours.git
cd watford-tours
```

2. Navigate to the project directory

```bash
cd watford-tours
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/    # React components
├── context/      # Context providers
├── assets/       # Images and static files
└── tests/        # Test files
```


## Testing

The project uses Jest and React Testing Library for testing. Tests cover:
- Component rendering
- User interactions
- Form submissions
- Context state management
- Async operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Images sourced from [source]
- Icons from [Lucide Icons](https://lucide.dev/)
- Design inspiration from [source]
