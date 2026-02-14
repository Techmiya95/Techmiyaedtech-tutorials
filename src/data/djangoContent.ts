import { Chapter } from "./javaContent";

export const djangoChapters: Chapter[] = [
    {
        id: 1,
        slug: "web-fundamentals",
        title: "Web Development Fundamentals",
        description: "Understanding how the web works, HTTP, Client-Server model, and MVC architecture.",
        sections: [
            {
                heading: "Client-Server Model",
                content: "The web works on a request-response cycle. The client (browser) sends a request, and the server processes it and sends back a response.",
            },
            {
                heading: "HTTP/HTTPS Protocol",
                content: "HTTP methods (GET, POST, PUT, DELETE) define the action. HTTPS adds security via SSL/TLS.",
            },
            {
                heading: "MVC vs MVT Architecture",
                content: "Django uses **MVT (Model-View-Template)**, which is slightly different from MVC.\n- **Model**: Data Access Layer\n- **View**: Business Logic (Controller in MVC)\n- **Template**: Presentation Layer (View in MVC)",
            },
        ],
    },
    {
        id: 2,
        slug: "python-prerequisites",
        title: "Python for Django (Prerequisites)",
        description: "Review of Python concepts essential for Django development.",
        sections: [
            {
                heading: "Virtual Environments",
                content: "Isolated environments for project dependencies.",
                code: `python -m venv venv
# Activate
source venv/bin/activate  # Linux/Mac
venv\\Scripts\\activate     # Windows`,
                codeTitle: "terminal",
            },
            {
                heading: "Classes and OOP",
                content: "Django relies heavily on classes (Class-Based Views, Models).",
                code: `class Car:
    def __init__(self, brand):
        self.brand = brand

    def drive(self):
        print(f"Driving {self.brand}")`,
                codeTitle: "oop.py",
            },
        ],
    },
    {
        id: 3,
        slug: "intro-to-django",
        title: "Introduction to Django",
        description: "Setting up Django, creating a project, and running the server.",
        sections: [
            {
                heading: "Installation",
                content: "Install Django using pip.",
                code: `pip install django`,
                codeTitle: "terminal",
            },
            {
                heading: "Creating a Project",
                content: "Start a new Django project.",
                code: `django-admin startproject myproject
cd myproject
python manage.py runserver`,
                codeTitle: "terminal",
            },
            {
                heading: "Project Structure",
                content: "- `manage.py`: Command-line utility.\n- `settings.py`: Configuration.\n- `urls.py`: URL declarations.\n- `wsgi.py/asgi.py`: Web server entry points.",
            },
        ],
    },
    {
        id: 4,
        slug: "django-apps",
        title: "Django Apps",
        description: "Creating modular apps and registering them.",
        sections: [
            {
                heading: "Creating an App",
                content: "A project can contain multiple apps.",
                code: `python manage.py startapp myapp`,
                codeTitle: "terminal",
            },
            {
                heading: "Registering Apps",
                content: "Add the app to `INSTALLED_APPS` in `settings.py`.",
                code: `INSTALLED_APPS = [
    'django.contrib.admin',
    ...
    'myapp',
]`,
                codeTitle: "settings.py",
            },
        ],
    },
    {
        id: 5,
        slug: "url-routing",
        title: "URL Routing",
        description: "Mapping URLs to views using the URL dispatcher.",
        sections: [
            {
                heading: "Project URLs",
                content: "Include app URLs in the main `urls.py`.",
                code: `from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
]`,
                codeTitle: "myproject/urls.py",
            },
            {
                heading: "App URLs",
                content: "Define specific routes in the app.",
                code: `from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]`,
                codeTitle: "myapp/urls.py",
            },
        ],
    },
    {
        id: 6,
        slug: "views",
        title: "Views",
        description: "Handling logic with Function-Based and Class-Based Views.",
        sections: [
            {
                heading: "Function-Based View (FBV)",
                content: "Simple functions that return an HttpResponse.",
                code: `from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, Django!")`,
                codeTitle: "myapp/views.py",
            },
            {
                heading: "Rendering Templates",
                content: "Using `render()` to return HTML.",
                code: `from django.shortcuts import render

def home(request):
    return render(request, 'home.html', {'title': 'Home Page'})`,
                codeTitle: "myapp/views.py",
            },
        ],
    },
    {
        id: 7,
        slug: "templates",
        title: "Templates & Static Files",
        description: "Using Django Template Language (DTL) and serving static files.",
        sections: [
            {
                heading: "Template Syntax",
                content: "Variables and Tags.",
                code: `<h1>Hello, {{ user.username }}!</h1>
{% if user.is_authenticated %}
    <p>Welcome back!</p>
{% endif %}`,
                codeTitle: "home.html",
            },
            {
                heading: "Template Inheritance",
                content: "Reuse layouts with `extends` and `block`.",
                code: `<!-- base.html -->
<html>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- child.html -->
{% extends 'base.html' %}
{% block content %}
    <h1>Child Page</h1>
{% endblock %}`,
                codeTitle: "templates",
            },
        ],
    },
    {
        id: 8,
        slug: "models-database",
        title: "Models & Database",
        description: "Defining data structure with ORM and Migrations.",
        sections: [
            {
                heading: "Creating Models",
                content: "Models represent database tables.",
                code: `from django.db import models

class Product(models.model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name`,
                codeTitle: "myapp/models.py",
            },
            {
                heading: "Migrations",
                content: "Apply changes to the database.",
                code: `python manage.py makemigrations
python manage.py migrate`,
                codeTitle: "terminal",
            },
        ],
    },
    {
        id: 9,
        slug: "admin-panel",
        title: "Django Admin",
        description: "Managing data via the built-in admin interface.",
        sections: [
            {
                heading: "Registering Models",
                content: "Make models visible in the admin panel.",
                code: `from django.contrib import admin
from .models import Product

admin.site.register(Product)`,
                codeTitle: "myapp/admin.py",
            },
            {
                heading: "Creating Superuser",
                content: "Create an admin account.",
                code: `python manage.py createsuperuser`,
                codeTitle: "terminal",
            },
        ],
    },
    {
        id: 10,
        slug: "forms",
        title: "Django Forms",
        description: "Handling user input, validation, and ModelForms.",
        sections: [
            {
                heading: "ModelForm",
                content: "Create a form directly from a model.",
                code: `from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description']`,
                codeTitle: "myapp/forms.py",
            },
            {
                heading: "Using Forms in Views",
                content: "Handle GET and POST requests.",
                code: `def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'form.html', {'form': form})`,
                codeTitle: "myapp/views.py",
            },
        ],
    },
    {
        id: 11,
        slug: "authentication",
        title: "Authentication & Authorization",
        description: "User login, logout, registration, and permissions.",
        sections: [
            {
                heading: "Login/Logout",
                content: "Using built-in auth views.",
                code: `from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]`,
                codeTitle: "urls.py",
            },
            {
                heading: "Decorators",
                content: "Restrict access to views.",
                code: `from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')`,
                codeTitle: "views.py",
            },
        ],
    },
];
