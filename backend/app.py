from flask import Flask
import path

app = Flask(__name__)
app.register_blueprint(path.bp)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
