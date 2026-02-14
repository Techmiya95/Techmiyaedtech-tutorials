import { Chapter } from "./javaContent";

export const flaskChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Flask",
        description: "What is Flask, WSGI, Jinja2, and setting up the environment.",
        sections: [
            {
                heading: "What is Flask?",
                content: "Flask is a lightweight WSGI web application framework in Python. It is designed to make getting started quick and easy, with the ability to scale up to complex applications.",
            },
            {
                heading: "Installation",
                content: "Install Flask using pip.",
                code: `pip install Flask`,
                codeTitle: "terminal",
            },
            {
                heading: "First Flask App",
                content: "A minimal Flask application.",
                code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(debug=True)`,
                codeTitle: "app.py",
                output: "Running on http://127.0.0.1:5000",
            },
        ],
    },
    {
        id: 2,
        slug: "routing",
        title: "Routing & Variable Rules",
        description: "URL routing, dynamic URLs, and HTTP methods.",
        sections: [
            {
                heading: "Routing",
                content: "Use the `@app.route()` decorator to bind a function to a URL.",
                code: `@app.route('/about')
def about():
    return 'About Page'`,
                codeTitle: "routes.py",
            },
            {
                heading: "Variable Rules",
                content: "Pass variables via the URL.",
                code: `@app.route('/user/<username>')
def show_user_profile(username):
    return f'User {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'`,
                codeTitle: "dynamic_routes.py",
            },
        ],
    },
    {
        id: 3,
        slug: "templates",
        title: "Templates (Jinja2)",
        description: "Rendering HTML templates and passing data.",
        sections: [
            {
                heading: "Rendering Templates",
                content: "Use `render_template` to serve HTML files from the `templates` folder.",
                code: `from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)`,
                codeTitle: "app.py",
            },
            {
                heading: "Jinja2 Syntax",
                content: "Embed Python-like code in HTML.",
                code: `<!-- templates/hello.html -->
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}`,
                codeTitle: "hello.html",
            },
        ],
    },
    {
        id: 4,
        slug: "static-files",
        title: "Static Files",
        description: "Serving CSS, JavaScript, and images.",
        sections: [
            {
                heading: "Using Static Files",
                content: "Files in the `static` folder are available at `/static/filename`.",
                code: `<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">`,
                codeTitle: "template.html",
            },
        ],
    },
    {
        id: 5,
        slug: "forms",
        title: "Handling Forms",
        description: "GET and POST requests, and accessing form data.",
        sections: [
            {
                heading: "Request Object",
                content: "Access incoming request data via `flask.request`.",
                code: `from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()`,
                codeTitle: "app.py",
            },
            {
                heading: "Form Data",
                content: "Access POST data.",
                code: `username = request.form['username']
password = request.form['password']`,
                codeTitle: "form_data.py",
            },
        ],
    },
    {
        id: 6,
        slug: "redirects-errors",
        title: "Redirects & Errors",
        description: "redirect(), url_for(), and error handlers (404).",
        sections: [
            {
                heading: "Redirects",
                content: "Redirect users to different endpoints.",
                code: `from flask import abort, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    abort(401) # Unauthorized`,
                codeTitle: "redirect.py",
            },
            {
                heading: "Error Pages",
                content: "Custom error pages.",
                code: `@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404`,
                codeTitle: "errors.py",
            },
        ],
    },
    {
        id: 7,
        slug: "cookies-sessions",
        title: "Cookies & Sessions",
        description: "Storing data on the client side vs server side.",
        sections: [
            {
                heading: "Cookies",
                content: "Stored on the client browser.",
                code: `from flask import make_response

@app.route('/')
def index():
    resp = make_response(render_template('index.html'))
    resp.set_cookie('username', 'the_username')
    return resp`,
                codeTitle: "cookies.py",
            },
            {
                heading: "Sessions",
                content: "Stored on server (signed cookie). Requires `secret_key`.",
                code: `from flask import session

app.secret_key = 'BAD_SECRET_KEY' # Change this!

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

@app.route('/login')
def login():
    session['username'] = 'user1'
    return 'Logged in'

@app.route('/logout')
def logout():
    session.pop('username', None)
    return 'Logged out'`,
                codeTitle: "sessions.py",
            },
        ],
    },
    {
        id: 8,
        slug: "database",
        title: "Database Integration",
        description: "Using SQLite and SQLAlchemy with Flask.",
        sections: [
            {
                heading: "Flask-SQLAlchemy",
                content: "An extension that adds support for SQLAlchemy.",
                code: `from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'`,
                codeTitle: "models.py",
            },
        ],
    },
    {
        id: 9,
        slug: "blueprints",
        title: "Blueprints & Large Apps",
        description: "Organizing your application into modules.",
        sections: [
            {
                heading: "Using Blueprints",
                content: "Factor an app into a set of blueprints.",
                code: `# auth.py
from flask import Blueprint

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return 'Login Page'

# app.py
from auth import auth
app.register_blueprint(auth, url_prefix='/auth')`,
                codeTitle: "blueprints.py",
            },
        ],
    },
    {
        id: 10,
        slug: "rest-api",
        title: "Building REST APIs",
        description: "Returning JSON, handling methods, and status codes.",
        sections: [
            {
                heading: "JSON Response",
                content: "Use `jsonify` to return JSON data.",
                code: `from flask import jsonify

@app.route('/api/users')
def get_users():
    users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]
    return jsonify(users)`,
                codeTitle: "api.py",
            },
        ],
    },
    {
        id: 11,
        slug: "testing",
        title: "Testing Flask Apps",
        description: "Unit testing with `pytest`.",
        sections: [
            {
                heading: "Writing Tests",
                content: "Use Flask's test client.",
                code: `import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_hello(client):
    rv = client.get('/')
    assert b'Hello, World!' in rv.data`,
                codeTitle: "test_app.py",
            },
        ],
    },
    {
        id: 12,
        slug: "deployment",
        title: "Deployment",
        description: "Deploying to production using Gunicorn and Nginx.",
        sections: [
            {
                heading: "Gunicorn (WSGI Server)",
                content: "Do not use `app.run()` in production. Use a production WSGI server.",
                code: `pip install gunicorn
gunicorn -w 4 app:app`,
                codeTitle: "terminal",
            },
        ],
    },
];
