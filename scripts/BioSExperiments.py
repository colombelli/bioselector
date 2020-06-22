


class BioSExperiments:

    def __init__(self, experiments, results_path):

        self.experiments = experiments
        self.results_path = results_path



    def run(self):

        for i, exp in enumerate(self.experiments):
            
            if exp.type == 'sin':
                print("a")

            elif exp.type == 'hom':
                print("a")
            elif exp.type == 'het':
                print("a")
            elif exp.type == 'hyb':
                print("a")
        return

"""

    def perform_selection_hyb(dataset_path, results_path, aggregator1, aggregator2):
        
    str_aggregators = [aggregator1, aggregator2]

    dm = DataManager(results_path, dataset_path, num_bootstraps, num_folds, seed)
    dm.encode_main_dm_df()
    dm.create_results_dir()
    dm.init_data_folding_process()

    ev = Evaluator(dm, ths, False)
    im = InformationManager(dm, ev, str_methods, str_aggregators)
    ensemble = Hybrid(dm, fs_methods, aggregator1, aggregator2, ths)

    st = time()
    ensemble.select_features()
    compute_print_time(st)

    print("\n\nDecoding dataframe...")
    dm.decode_main_dm_df()
    print("\nStarting evaluation process...")
    ev.evaluate_final_rankings()

    print("\n\nCreating csv files...")
    im.create_csv_tables()

    print("\nEvaluating inner levels...")
    level1_evaluation, level2_evaluation = ev.evaluate_intermediate_hyb_rankings()

    print("\n\nCreating csv files...")
    im.create_intermediate_csv_tables(level1_evaluation, level2_evaluation)

    print("\nDone!\n\n")
    print("#################################################################\n")
    return



def perform_selection_het(dataset_path, results_path, aggregator):

    str_aggregators = [aggregator]

    num_bootstraps = 0

    dm = DataManager(results_path, dataset_path, num_bootstraps, num_folds, seed)
    dm.encode_main_dm_df()
    dm.create_results_dir()
    dm.init_data_folding_process()
    
    ev = Evaluator(dm, ths, False)
    im = InformationManager(dm, ev, str_methods, str_aggregators)
    ensemble = Heterogeneous(dm, fs_methods, aggregator, ths)

    st = time()
    ensemble.select_features()
    compute_print_time(st)

    print("\n\nDecoding dataframe...")
    dm.decode_main_dm_df()
    print("\nStarting evaluation process...")
    ev.evaluate_final_rankings()

    print("\n\nCreating csv files...")
    im.create_csv_tables()

    print("\nDone!\n\n")
    print("#################################################################\n")
    return



def perform_selection_hom(dataset_path, results_path, fs_method, aggregator):

    str_aggregators = [aggregator]

    dm = DataManager(results_path, dataset_path, num_bootstraps, num_folds, seed)
    dm.encode_main_dm_df()
    dm.create_results_dir()
    dm.init_data_folding_process()

    ev = Evaluator(dm, ths, False)
    im = InformationManager(dm, ev, str_methods, str_aggregators)
    ensemble = Homogeneous(dm, fs_method, aggregator, ths)

    st = time()
    ensemble.select_features() 
    compute_print_time(st)

    print("\n\nDecoding dataframe...")
    dm.decode_main_dm_df()
    print("\nStarting evaluation process...")
    ev.evaluate_final_rankings()

    print("\n\nCreating csv files...")
    im.create_csv_tables()

    print("\nDone!\n\n")
    print("#################################################################\n")
    return



def perform_selection_single(dataset_path, results_path, selectors, fs_method, num_folds, seed):

    str_aggregators = ["No aggregation"]
    num_bootstraps = 0
    selectors_str = selectors[0][0]    # because selectors is always a list, even when it have only one element

    dm = DataManager(results_path, dataset_path, num_bootstraps, num_folds, seed)
    dm.encode_main_dm_df()
    dm.create_results_dir()
    dm.init_data_folding_process()

    ev = Evaluator(dm, ths, False)
    im = InformationManager(dm, ev, str_methods, str_aggregators)
    feature_selector = SingleFS(dm, fs_method, ths)

    st = time()
    feature_selector.select_features()
    compute_print_time(st)

    print("\n\nDecoding dataframe...")
    dm.decode_main_dm_df()
    print("\nStarting evaluation process...")
    ev.evaluate_final_rankings()

    print("\n\nCreating csv files...")
    im.create_csv_tables()

    print("\nDone!\n\n")
    print("#################################################################\n")
    return

"""