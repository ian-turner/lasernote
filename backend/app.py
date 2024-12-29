import hashlib
import uuid
import secrets
from pymongo import MongoClient
from bson.json_util import dumps, loads
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

TOKEN_SIZE_BYTES = 32

client = MongoClient('mongo', 27017)
db = client.appdb
app = Flask(__name__)
CORS(app, supports_credentials=True)


def login_required(func):
    def func_wrapper(*args, **kwargs):
        auth_token = request.cookies.get('auth_token')
        current_user = db.users.find_one({'auth_tokens': auth_token})
        if not current_user:
            return make_response({'message': 'Invalid credentials'}, 400)

        return func(current_user, *args, **kwargs)

    func_wrapper.__name__ = func.__name__
    return func_wrapper


@app.route('/register', methods=['POST'])
def register():
    # getting user data
    data = request.json
    if 'email' not in data or 'password' not in data:
        return make_response({'message': 'Invalid input'}, 400)

    email = data['email']
    password = data['password']

    # checking if existing user
    existing = db.users.find_one({'email': email})
    if existing:
        return make_response({'message': 'Existing user with that email address'}, 400)

    # hashing password
    _hash = hashlib.sha256()
    _hash.update(password.encode())
    hashed_password = _hash.hexdigest()

    # creating authentication token
    auth_token = secrets.token_hex(TOKEN_SIZE_BYTES)

    # inserting into database
    db.users.insert_one({'email': email, 'hashed_password': hashed_password, 'auth_tokens': [auth_token]})

    # return results to user
    res = make_response({'message': 'User registered'})
    res.set_cookie('auth_token', auth_token)
    return res


@app.route('/login', methods=['POST'])
def login():
    # getting user data
    data = request.json
    if 'email' not in data or 'password' not in data:
        return make_response({'message': 'Invalid input'}, 400)

    email = data['email']
    password = data['password']

    # hashing password
    _hash = hashlib.sha256()
    _hash.update(password.encode())
    hashed_password = _hash.hexdigest()

    # checking against database
    user = db.users.find_one({'email': email, 'hashed_password': hashed_password})
    if not user:
        return make_response({'message': 'Invalid login credentials'}, 400)

    # creating authentication token
    auth_token = secrets.token_hex(TOKEN_SIZE_BYTES)

    # inserting into database
    db.users.update_one({'email': user['email']}, {'$push': {'auth_tokens': auth_token}})

    # return results to user
    res = make_response({'message': 'User authenticated'})
    res.set_cookie('auth_token', auth_token)
    return res


@app.route('/notes')
@login_required
def get_notes(current_user):
    notes = db.notes.find({'owner': current_user['_id']}, {'_id': 0, 'owner': 0})
    return make_response({'notes': notes})


@app.route('/notes/<note_id>', methods=['GET', 'POST'])
@login_required
def get_note_by_id(current_user, note_id):
    if request.method == 'GET':
        note = db.notes.find_one({'owner': current_user['_id'], 'id': note_id}, {'_id': 0, 'owner': 0})
        if note:
            return make_response({'note': note})

        return make_response({'message': 'Invalid note ID'}, 404)
    else:
        data = request.json
        db.notes.update_one({'owner': current_user['_id'], 'id': note_id}, {'$set': {'markdown': data['markdown']}})
        return make_response({'message': 'Note updated'})
