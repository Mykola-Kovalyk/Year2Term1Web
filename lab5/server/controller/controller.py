from main import app

@app.route('/parking', method=['GET'])
def index():
    return "All parkings"

@app.route('/parking/<id>', method=['POST'])
def get_parkings(id):
    print(id)
    return "what a horrible smell... code smell!"

@app.route('/parking/<id>', method=['PATCH'])
def edit_parking(id):
    print(id)
    return "what a horrible smell... code smell!"

@app.route('/parking/<id>', method=['DELETE'])
def delete_parking(id):
    print(id)
    return "what a horrible smell... code smell!"
