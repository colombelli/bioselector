import sys
import json
from efsassembler import ScriptsManager

args = sys.argv[1]
input_data = json.loads(args)


personalized_aggregator_path = input_data[0]
sm = ScriptsManager()
sm.add_aggregation_algorithm(personalized_aggregator_path)

print("Aggregator added:", personalized_aggregator_path)
sys.stdout.flush()