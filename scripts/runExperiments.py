import sys
import json
import rpy2.robjects.packages as rpackages
from efsassembler import Experiments


args = sys.argv[1]
input_data = json.loads(args)

experiments = input_data[0]
results_path = input_data[1]

print(experiments)
sys.stdout.flush()

print(results_path)
sys.stdout.flush()

exp = Experiments(experiments, results_path)
exp.run()