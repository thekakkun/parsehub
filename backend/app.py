from flask import Flask
from flask_cors import CORS
import path

app = Flask(__name__)
CORS(app)
app.register_blueprint(path.bp)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
