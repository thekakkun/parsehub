from flask import Flask, jsonify
from flask_cors import CORS
import path

app = Flask(__name__)
CORS(app)
app.register_blueprint(path.bp)


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


@app.errorhandler(422)
def unprocessable_entity(e):
    return jsonify(error=str(e)), 404


@app.route("/")
def hello_world():
    """Test route to check things are working."""
    
    return "<p>Hello, World!</p>"
