# SecureSocial

## Introduction

SecureSocial is a highly secure, modern social media web application built using **Django REST Framework** for the backend and **Next.js** for the frontend. It allows users to register, log in, post content (including images), and send private messages to one another. The app has a primary focus on security, ensuring that user data and interactions are protected from common vulnerabilities.

---

## Features

1. **User Management**:
   - Secure user registration and login system.
   - JWT-based authentication for secure session management.
   - Passwords are hashed using Django's built-in password hashing mechanism.

2. **Post Management**:
   - Users can create, view, and interact with posts.
   - Each post can include an optional image.

3. **Private Messaging**:
   - Secure messaging system for one-to-one communication between users.
   - All messages are encrypted during transit using HTTPS.

4. **Security Features**:
   - **CSRF Protection**: Enabled in the backend to prevent Cross-Site Request Forgery attacks.
   - **X-Frame-Options**: Protects against clickjacking by denying the site from being embedded in iframes.
   - **Content Security Policy**: Ensures only trusted scripts and resources are loaded.
   - **JWT Authentication**: Provides token-based secure user sessions with token rotation to prevent token hijacking.
   - **Rate Limiting**: Protects against brute force attacks on sensitive endpoints.
   - **Input Validation**: Validates user input on both the frontend and backend to prevent injection attacks.
   - **Secure Headers**: HTTP headers like `X-Content-Type-Options` and `Strict-Transport-Security` are set to enforce secure communication.
   - **Password Validation**: Enforces strong passwords using Django's built-in validators.

---

## Security Features in Detail

### 1. **CSRF Protection**
- **Implemented In**: Backend.
- **How**: The `CsrfViewMiddleware` ensures all POST, PUT, and DELETE requests include a valid CSRF token, mitigating CSRF attacks.
- **Code Reference**:
  ```python
  MIDDLEWARE = [
      'django.middleware.csrf.CsrfViewMiddleware',
  ]
  ```

### 2. **X-Frame-Options**
- **Implemented In**: Backend.
- **How**: The `X_FRAME_OPTIONS` setting is configured to `DENY`, preventing the application from being embedded in an iframe.
- **Code Reference**:
  ```python
  X_FRAME_OPTIONS = 'DENY'
  ```

### 3. **Content Security Policy (CSP)**
- **Implemented In**: Backend.
- **How**: CSP headers are added via middleware, ensuring only trusted resources are loaded.
- **Code Reference**:
  ```python
  MIDDLEWARE = [
      'csp.middleware.CSPMiddleware',
  ]
  CSP_DEFAULT_SRC = ("'self'",)
  CSP_IMG_SRC = ("'self'", "data:")
  ```

### 4. **JWT Authentication**
- **Implemented In**: Backend.
- **How**: The app uses **Django Simple JWT** for managing authentication tokens with features like token rotation and refresh.
- **Code Reference**:
  ```python
  SIMPLE_JWT = {
      'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
      'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
      'ROTATE_REFRESH_TOKENS': True,
      'BLACKLIST_AFTER_ROTATION': True,
  }
  ```

### 5. **Rate Limiting**
- **Implemented In**: Backend.
- **How**: Rate-limiting middleware is used to prevent brute force attacks.
- **Code Reference**:
  ```python
  INSTALLED_APPS += ['django_ratelimit']
  ```

### 6. **Input Validation**
- **Implemented In**: Both Frontend and Backend.
- **How**: User inputs are validated for format and size to prevent injection attacks (e.g., SQL injection, XSS).
- **Frontend Validation Example**:
  ```javascript
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
  };
  ```
- **Backend Validation Example**:
  ```python
  class RegisterSerializer(serializers.ModelSerializer):
      password = serializers.CharField(write_only=True, min_length=8)
  ```

### 7. **Secure Password Storage**
- **Implemented In**: Backend.
- **How**: User passwords are hashed using Django's default password hashing algorithm (PBKDF2).
- **Code Reference**:
  ```python
  def create(self, validated_data):
      return User.objects.create_user(
          username=validated_data['username'],
          password=validated_data['password'],
      )
  ```

### 8. **Secure HTTP Headers**
- **Implemented In**: Backend.
- **How**: Headers like `Strict-Transport-Security` and `X-Content-Type-Options` are set to ensure secure communication and prevent MIME-based attacks.
- **Code Reference**:
  ```python
  SECURE_CONTENT_TYPE_NOSNIFF = True
  SECURE_BROWSER_XSS_FILTER = True
  ```

---

## Installation and Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sparrowjumpy/SSD_LAB.git
   cd SSD_LAB/backend
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Apply migrations and start the server:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

| Endpoint                | Method | Description                 | Authentication |
|-------------------------|--------|-----------------------------|----------------|
| `/api/auth/register`    | POST   | User registration           | No             |
| `/api/auth/login`       | POST   | User login                  | No             |
| `/api/auth/logout`      | POST   | User logout                 | Yes            |
| `/api/posts`            | GET    | Get all posts               | Yes            |
| `/api/posts/create`     | POST   | Create a new post           | Yes            |
| `/api/messages`         | GET    | Get messages for a user     | Yes            |
| `/api/messages/send`    | POST   | Send a private message      | Yes            |

---

## Technologies Used

1. **Frontend**:
   - Next.js
   - Tailwind CSS

2. **Backend**:
   - Django REST Framework
   - Simple JWT for authentication

3. **Database**:
   - SQLite (can be replaced with PostgreSQL)

4. **Other Tools**:
   - Git for version control.
   - Nginx (recommended for deployment).

---

## Future Enhancements

- Add post comments and likes.
- Implement a real-time chat feature using WebSockets.
- Introduce notification functionality for user interactions.
- Deploy to a production server with SSL/TLS certificates.

---
