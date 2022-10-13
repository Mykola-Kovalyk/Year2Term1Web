
import json
import os
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


from controller import *

if __name__ == '__main__':
    
    if not os.path.exists(data_path):
        update_data()
    else:
        read_data()

    app.run(debug=True)