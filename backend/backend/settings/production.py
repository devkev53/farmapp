from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-nt4t0wy)#tmd!s&1enawmt!a6o*-ptz@my)5lud57jebd^#g^0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*', '0.0.0.0', 'localhost', '127.0.0.1', '192.168.20.20', '192.168.10.20',]

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# - Method 1
STATICFILES_DIRS = [BASE_DIR / 'static']

# MEDIA CONFIGURATION
MEDIA_URL = '/media/'
MEDIA_DIR = BASE_DIR/ 'media'
MEDIA_ROOT = MEDIA_DIR

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CHANGE AUTH_USER_MODEL

AUTH_USER_MODEL = 'users.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'core.backend.AuthEmailBackend',
]


# SIMPLE_JWT CONFIGURATION

SIMPLE_JWT = {
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    # 'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=4),
}


# CORS CONFIGURATION
# CORS CONFIG
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://192.168.10.10:5173",    
    "http://192.168.20.10:5173",
    "http://192.168.0.20:5173",
    "http://192.168.0.17:5173",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
    "http://192.168.10.10:5173",    
    "http://192.168.20.10:5173",
    "http://192.168.0.11:5173",
    "http://192.168.0.17:5173",
]
CORS_ORIGIN_WHITELIST= [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://192.168.10.10:5173",    
    "http://192.168.20.10:5173",
    "http://192.168.0.20:5173",
    "http://192.168.0.17:5173",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
    "http://192.168.10.10:5173",    
    "http://192.168.20.10:5173",
    "http://192.168.0.11:5173",
    "http://192.168.0.17:5173",
]