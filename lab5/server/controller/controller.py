import json
from main import app
from flask import request


data = { "iterator" : 0, "facilities": {} } 
data_path =  "data.json"

def update_data():
    global data
    with open(data_path, 'w') as f:
        json.dump(data, f)

def read_data():
    global data
    with open(data_path, 'r') as f:
        data = json.load(f)

@app.route('/parking', methods=['GET'])
def get_all_parkings():
    data_dict = data["facilities"]

    return data_dict

@app.route('/parking', methods=['POST'])
def post_parking():
    new_parking = request.json
    new_id = data["iterator"]
    data["iterator"] += 1
    data["facilities"][str(new_id)] = new_parking
    update_data()
    return 'OK'

@app.route('/parking/<id>', methods=['PATCH'])
def edit_parking(id):
    data_dict = data["facilities"]
    data_dict[id] = request.json
    update_data()
    return 'OK'

@app.route('/parking/<id>', methods=['DELETE'])
def delete_parking(id):
    data_dict = data["facilities"]
    del data_dict[id]
    update_data()
    return 'OK'



