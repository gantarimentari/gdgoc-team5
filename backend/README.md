# Sift - AI Recruitment SaaS Backend

A production-ready, high-performance backend for an AI-powered recruitment platform that analyzes candidate CVs using Google Gemini AI.

## 🚀 Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **Job Management**: Create and manage job postings
- **CV Analysis**: Async AI-powered CV processing using Google Gemini 2.5 Flash
- **Validation**: Strict Zod schema validation for inputs and AI outputs
- **Security**: Helmet, CORS, rate limiting, and no sensitive data logging
- **Documentation**: Swagger/OpenAPI docs + Bruno API collection
- **Testing**: Jest integration tests
- **Type Safety**: Strict TypeScript configuration

## 📋 Prerequisites

- Node.js 18+ (with npm)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## 🛠️ Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase for production) + Prisma ORM
- **AI**: Google Gemini API (`@google/genai`)
- **Auth**: JWT + bcryptjs
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **API Client**: Bruno

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd sift-backend
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:


### 3. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

### 4. Start the Application

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs (Protected)
- `POST /api/jobs` - Create job posting
- `GET /api/jobs` - Get all user's jobs
- `GET /api/jobs/:id` - Get specific job
- `DELETE /api/jobs/:id` - Delete job

### Candidates (Protected)
- `POST /api/jobs/:jobId/candidates` - Upload CV (Returns 202 Accepted)
- `GET /api/jobs/:jobId/candidates` - Get all candidates for a job
- `GET /api/candidates/:id` - Get candidate details
- `DELETE /api/candidates/:id` - Delete candidate
- `POST /api/candidates/:id/reprocess` - Reprocessing candidate's CV

## 🎯 How It Works

### CV Processing Flow

1. **Upload**: Client uploads PDF via `POST /api/jobs/:jobId/candidates`
2. **Immediate Response**: Server returns `202 Accepted` with candidate ID
4. **Worker Processing**:
   - Extract text from PDF
   - Send to Google Gemini with job description
   - Validate AI response with Zod schema
   - Update candidate record in database
5. **Status Updates**: Candidate status: `PENDING` → `PROCESSING` → `COMPLETED` (or `FAILED`)

### Example AI Response Schema

```typescript
{
  name?: string;           // Extracted from CV
  email?: string;           // Extracted from CV
  score: number;           // 0-100 job fit score
  summary: string;         // Comprehensive assessment
  pros: string[];          // 3-8 strengths
  cons: string[];          // 3-8 weaknesses/gaps
  skills: string[];        // 5-30 identified skills
}
```

## 🔧 Project Structure

```
src/
├── config/          # Configuration (Redis, Gemini, Prisma)
├── controllers/     # HTTP request handlers
├── middleware/      # Auth, error handling, rate limiting, upload
├── routes/          # Express route definitions
├── services/        # Business logic layer
├── schemas/         # Zod validation schemas
├── utils/           # Utilities (AppError, catchAsync, PDF parser)
├── tests/           # Integration tests
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## 🛡️ Security Features

- ✅ Helmet for HTTP headers security
- ✅ CORS configuration
- ✅ Rate limiting (100 req/15min)
- ✅ JWT with expiration
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ Input validation (Zod)
- ✅ No sensitive data logging
- ✅ File type validation (PDF only)
- ✅ File size limits (10MB)

## 🚨 Error Handling

The API uses consistent error responses:

```json
{
  "status": "error",
  "message": "Error description"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (auth required)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## 🔍 Debugging

### Common Issues


**Issue**: Database connection error
```bash
# Verify DATABASE_URL is correct
npm run prisma:studio
```

## 📝 Scripts Reference

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm test                 # Run tests
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
```

## 🤝 API Testing with Bruno

See `bruno-collection.md` for complete Bruno API collection setup.

Quick start:
1. Install Bruno from https://www.usebruno.com/
2. Follow instructions in `bruno-collection.md`
3. Test all endpoints with auto-saved tokens

## Acknowledgments

- Google Gemini AI for CV analysis
- Prisma for type-safe database access

