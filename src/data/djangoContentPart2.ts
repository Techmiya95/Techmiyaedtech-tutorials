import { Chapter } from "./javaContent";

export const djangoChaptersPart2: Chapter[] = [
    {
        id: 12,
        slug: "rest-framework",
        title: "Django REST Framework (DRF)",
        description: "Building APIs with Serializers and ViewSets.",
        sections: [
            {
                heading: "Installation",
                content: "Install djangorestframework.",
                code: `pip install djangorestframework`,
                codeTitle: "terminal",
            },
            {
                heading: "Serializer",
                content: "Convert complex data to JSON.",
                code: `from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'`,
                codeTitle: "serializers.py",
            },
            {
                heading: "API View",
                content: "Create an endpoint.",
                code: `from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer`,
                codeTitle: "views.py",
            },
        ],
    },
    {
        id: 13,
        slug: "middleware",
        title: "Middleware",
        description: "Hooks into Django's request/response processing.",
        sections: [
            {
                heading: "Custom Middleware",
                content: "Process requests or responses globally.",
                code: `class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Before view
        response = self.get_response(request)
        # After view
        return response`,
                codeTitle: "middleware.py",
            },
        ],
    },
    {
        id: 14,
        slug: "file-media",
        title: "File Upload & Media",
        description: "Handling user-uploaded files and images.",
        sections: [
            {
                heading: "Media Settings",
                content: "Configure `MEDIA_URL` and `MEDIA_ROOT`.",
                code: `MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'`,
                codeTitle: "settings.py",
            },
            {
                heading: "FileField",
                content: "Add file upload to models.",
                code: `image = models.ImageField(upload_to='products/')`,
                codeTitle: "models.py",
            },
        ],
    },
    {
        id: 15,
        slug: "sessions-cookies",
        title: "Sessions & Cookies",
        description: "Storing user data securely.",
        sections: [
            {
                heading: "Using Sessions",
                content: "Store data on the server side.",
                code: `request.session['fav_color'] = 'blue'
color = request.session.get('fav_color')`,
                codeTitle: "views.py",
            },
            {
                heading: "Setting Cookies",
                content: "Store data on the client side.",
                code: `response.set_cookie('username', 'john')`,
                codeTitle: "views.py",
            },
        ],
    },
    {
        id: 16,
        slug: "caching",
        title: "Caching & Performance",
        description: "Speeding up applications with caching and optimization.",
        sections: [
            {
                heading: "Per-View Caching",
                content: "Cache the output of specific views.",
                code: `from django.views.decorators.cache import cache_page

@cache_page(60 * 15) # Cache for 15 minutes
def my_view(request):
    ...`,
                codeTitle: "views.py",
            },
        ],
    },
    {
        id: 17,
        slug: "security",
        title: "Security in Django",
        description: "CSRF, XSS, SQL Injection protection, and HTTPS.",
        sections: [
            {
                heading: "Built-in Security",
                content: "- **CSRF Token**: `{% csrf_token %}` in forms.\n- **SQL Injection**: ORM handles parameterization automatically.\n- **XSS**: Templates escape variables by default.",
            },
        ],
    },
    {
        id: 18,
        slug: "testing",
        title: "Testing & Debugging",
        description: "Writing unit tests and using the Debug Toolbar.",
        sections: [
            {
                heading: "Unit Tests",
                content: "Use `django.test.TestCase`.",
                code: `from django.test import TestCase
from .models import Product

class ProductTestCase(TestCase):
    def test_product_creation(self):
        p = Product.objects.create(name="Test", price=10)
        self.assertEqual(p.name, "Test")`,
                codeTitle: "tests.py",
            },
        ],
    },
    {
        id: 19,
        slug: "deployment",
        title: "Deployment",
        description: "Moving from development to production (Gunicorn, Nginx).",
        sections: [
            {
                heading: "Production Checklist",
                content: "- Set `DEBUG = False`\n- Set `ALLOWED_HOSTS`\n- Use a production WSGI server (Gunicorn).",
            },
            {
                heading: "Gunicorn",
                content: "Run the app.",
                code: `gunicorn myproject.wsgi:application`,
                codeTitle: "terminal",
            },
        ],
    },
    {
        id: 20,
        slug: "frontend-frameworks",
        title: "Django with Frontend Frameworks",
        description: "Integrating React/Angular and handling CORS.",
        sections: [
            {
                heading: "Django + React",
                content: "Django serves as the REST API backend, React consumes it.",
            },
            {
                heading: "CORS Headers",
                content: "Allow cross-origin requests.",
                code: `pip install django-cors-headers
# Add to INSTALLED_APPS and MIDDLEWARE`,
                codeTitle: "terminal",
            },
        ],
    },
    {
        id: 21,
        slug: "project-structure",
        title: "Industry-Level Project Structure",
        description: "Best practices for scalable Django projects.",
        sections: [
            {
                heading: "Settings Management",
                content: "Split settings into `base.py`, `dev.py`, `prod.py`.",
            },
            {
                heading: "App Organization",
                content: "Group related apps into folders.",
            },
        ],
    },
    {
        id: 22,
        slug: "interview-prep",
        title: "Interview & Job Preparation",
        description: "Common Django interview questions and debugging scenarios.",
        sections: [
            {
                heading: "Common Questions",
                content: "1. What is MVT architecture?\n2. Explain the Django Request-Response cycle.\n3. Difference between select_related and prefetch_related?\n4. How does Django Middleware work?",
            },
            {
                heading: "Project Ideas",
                content: "- E-commerce Backend\n- Blog Application\n- Student Management System\n- REST API for Mobile App",
            },
        ],
    },
];
