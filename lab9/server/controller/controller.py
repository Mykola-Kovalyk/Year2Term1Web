import json
from main import app
from flask import request, abort
from time import sleep


data = { "iterator" : 0, "facilities": {}, "people": {} } 
data_path =  "data.json"

def update_data():
    global data
    with open(data_path, 'w') as f:
        json.dump(data, f, indent=4)

def read_data():
    global data
    with open(data_path, 'r') as f:
        data = json.load(f)

@app.route('/parking', methods=['GET'])
def get_all_parkings():
    data_dict = data["facilities"]

    searchString = request.args.get("searchString")
    minSlots = request.args.get("minSlots")

    if searchString is None and minSlots is None:
        return data_dict
    else:
        filtered_dict = {}
        for key, value in data_dict.items():

            if searchString is not None:
                if searchString not in value["title"] and searchString not in value["description"]:
                    continue
            if minSlots is not None:
                minSlots = int(minSlots)
                if minSlots > value["slots"]:
                    continue
            filtered_dict[key] = value
        
        return filtered_dict


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




@app.route('/parking/login', methods=['GET'])
def login():    
    email = request.args.get("email")
    password = request.args.get("password")

    person = data["people"][email]

    if person["password"] != password:
        abort(400, "Incorrect password")

    return person

        

@app.route('/parking/register', methods=['POST'])
def register():
    person = request.json
    people = data["people"]

    if(person["email"] in people):
        abort(400, "Person already exists")

    people[person["email"]] = person
    update_data()

    return person




