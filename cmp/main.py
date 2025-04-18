from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import sys
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

user_input = None  # Store the input received from the user

@app.route('/execute', methods=['POST'])
def execute_code():
    global user_input
    code = request.json.get('code')
    
    # Prepare to capture the output
    old_stdout = sys.stdout
    result = io.StringIO()
    sys.stdout = result

    output = ""  # Default empty output
    input_needed = False  # Flag to indicate if input is needed

    try:
        # Replacing input() with custom input for the simulation
        def mock_input(prompt):
            return user_input  # Return the input the user provided

        exec(code)
        output = result.getvalue()
    except Exception as e:
        output = str(e)
    finally:
        sys.stdout = old_stdout

    if 'input()' in code:  # Check if code requires input
        input_needed = True
        return jsonify({'message': 'Enter input:', 'inputNeeded': input_needed, 'inputCallback': mock_input})

    return jsonify({'result': output})

@app.route('/send_input', methods=['POST'])
def send_input():
    global user_input
    user_input = request.json.get('input')
    return jsonify({'result': 'Input received successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
