## How to run the application

1. Backend - npm run backend
2. Frontend - npm run frontend

## How you structured the backend and frontend

I structured the backend using an MVC pattern with a service layer to separate concerns. The routes handle API endpoints, controllers manage request and response flow, and the service layer contains the core business logic. I also used middleware for validation and DTOs to enforce type safety between requests and responses.

For the frontend, I used a feature-based structure with React and TypeScript, where pages represent full views and reusable components handle UI elements. I also centralized API calls in a dedicated layer and shared types to stay consistent with the backend.

One tradeoff of this approach is that while it works well for small to medium applications, as the system grows, the structure can become more complex to maintain if not properly modularized. That’s why clear folder boundaries and consistent patterns are important.

## Key Design Decisions and Tradeoffs

1. MVC + Service Layer Architecture (Backend)
   I structured the backend using MVC with an additional service layer. Controllers handle HTTP requests, while business logic is moved into services to keep controllers thin and focused. This improves separation of concerns and makes the code easier to test and maintain.

Tradeoff:
For small projects, this can feel slightly over-structured, but it becomes valuable as the system grows because logic is centralized and reusable.

2. DTOs for Type Safety
   I introduced DTOs using TypeScript to define request and response shapes. This ensures consistency between frontend and backend and reduces runtime errors.

Tradeoff:
It adds extra boilerplate, but it significantly improves reliability and maintainability.

3. Zod for Validation (Middleware Layer)
   I used Zod in middleware to validate incoming requests before they reach the controller. This keeps validation centralized and reusable.

Tradeoff:
It adds another dependency and learning curve, but it provides strong schema validation and better error control compared to manual validation.

4. Hardcoded / Mock Data for Pricing Logic
   For simplicity, I used hardcoded product prices and a threshold value instead of a database.

Tradeoff:
This makes the system easier to build and test, but it’s not scalable or dynamic. In a production system, this should be replaced with a database or external service.

5. React Feature-Based Structure (Frontend)
   On the frontend, I used a feature-based structure with separate folders for pages, components, API calls, and types. This keeps concerns separated and improves scalability.

Tradeoff:
It’s slightly more setup compared to a flat structure, but it becomes much easier to maintain as the application grows.
