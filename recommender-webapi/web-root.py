# web-root.py

from services.greet_module import greet
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    greeting = greet("my friends from code day")
    return f"<p>{greeting}</p>"

if __name__ == "__main__":
    app.run(debug=True)
