import sys
import json
from efsassembler import ScriptsManager

args = sys.argv[1]
input_data = json.loads(args)


personalized_selector_path = input_data[0]
sm = ScriptsManager()
sm.add_fs_algorithm(personalized_selector_path)

print("Selector added:", personalized_selector_path)
sys.stdout.flush()