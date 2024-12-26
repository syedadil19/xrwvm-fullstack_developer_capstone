import os
from pathlib import Path

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# New URL setup
ALLOWED_HOSTS = [
    'localhost',
    ('https://syedmohamada-8000.theiadockernext-0-labs-prod-theiak8s-4-' 
     'tor01.proxy.cognitiveclass.ai')
]
CSRF_TRUSTED_ORIGINS = [
    ('https://syedmohamada-8000.theiadockernext-0-labs-prod-theiak8s-4-'
     'tor01.proxy.cognitiveclass.ai')
]

# Application definition
INSTALLED_APPS = [
    'djangoapp.apps.DjangoappConfig',
    'django.contrib.admin',
    # Other apps...
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(STATIC_ROOT, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/static'),
    os.path.join(BASE_DIR, 'frontend/build'),
    os.path.join(BASE_DIR, 'frontend/build/static'),
]
