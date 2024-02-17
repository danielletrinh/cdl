# web-root.py (app.py)
from flask import Flask, send_from_directory
from services.fetch_model_attribs import get_embeddings_as_json
from flask_cors import CORS
app = Flask(__name__)

CORS(app)


@app.route('/')
@app.route('/<path:page_path>')
def homepage(page_path=None):
    if page_path == 'model-attributes':
        # Call the function to get model attributes as JSON
        result = get_embeddings_as_json(n_items=5, n_users=5)
        return result
    else:
        # Serve the index.html for other routes
        return send_from_directory('static', 'index.html')
