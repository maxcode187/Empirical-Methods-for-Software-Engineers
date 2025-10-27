let SEED = "666";
Nof1.SET_SEED(SEED); // eingabe für einen Zufallsgenerator 

let experiment_configuration_function = (writer) => { return {

    experiment_name: "TestExperiment",
    seed: SEED,

    introduction_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string(
            "Bitte öffne den Browser im Vollbildmodus mit der [F11]-Taste. \n" +
            "In diesem Experiment misst du deine Navigationsgeschwindigkeit zu einem Button. \n" +
            "Es gibt Abschnitte in denen du entweder die Maus oder das Touchpad benuzten sollst. \n" +
            "Vor jedem Abschnitt wird dir deutlich angezeigt, welches Eingabegerät du jetzt verwenden sollst. \n" + 
            "Bitte benutze dann nur dieses Gerät, bis der Abschnitt beendet ist. \n" +
            "Wenn Hello World angezeigt wird, drücke [1], ansonsten [0]."
        
        ),
    ]),

    pre_run_training_instructions: writer.string_page_command(
        writer.convert_string_to_html_string(
            "Du bist gerade in  Trainingsphase "
        )),

    pre_run_experiment_instructions: writer.string_page_command(
        writer.convert_string_to_html_string(
            "You entered the experiment phase.\n\n"
        )),

    finish_pages: [
        writer.string_page_command(
            writer.convert_string_to_html_string(
                "Almost done. Next, the experiment data will be downloaded. Please, send the " +
                "downloaded file to the experimenter.\n\nAfter sending your email, you can close this window.\n\nMany thanks for participating."
            )
        )
    ],

    layout: [
        /* ToDo: Hier müssen die Variablen des Experiments rein. Zuerst der Name der Variablen,
                 die unterschiedlichen Werte stehen als List in den Treatments
                 Im ersten Experiment hat man normalerweise nur eine Variable mit 2 Treatments (Werte für die Variable)
         */
        { variable: "InputDevice",  treatments: ["Mouse", "Touchpad"]},
        { variable: "Distance",  treatments: ["0", "10", "20"]},
    ],

    /* ToDo: Hier gebe ich an, wie oft ich jede Treatmentkombination im Experiment testen möchte */
    repetitions: 5,

    /* ToDo: Hier gebe ich an, welche "Art" das Experiment ist. Ich gehe hier davon aus, dass es ein Experiment ist,dass
    *        darauf wartet, dass der Teilnehmer die Taste "0" oder "1" drückt
    *  */
    measurement: Nof1.Reaction_time(Nof1.keys(["0", "1"])),

    task_configuration: (task) => {

        task.do_print_task = () => {

            // So erzeuge ich eine Zufallszahl (NICHT "default"-Code a la StackOverflow verwenden!
            // let random_int_from_0_to_excluding_10 = Nof1.new_random_integer(10);

            // Ausgabebildschirm wird gelöscht
            writer.clear_stage();

            // Guck, weist den Wert der ersten Experiment-Variablen (task.treatment_combination.treatment_combination[0])
            // der lokalen Variablen treatment_of_variable_MyVariable zu.
            /*let treatment_of_variable_MyVariable = task.treatment_combination.treatment_combination[0].value;

            // Testet, ob Wert von MyVariable den Wert "dummy" hat
            if( treatment_of_variable_MyVariable =="dummy") {
                writer.print_html_on_stage("Hello, world + random number: " + random_int_from_0_to_excluding_10);
                writer.print_html_on_stage("<h1>Mal reinen HTMLcode reingeschrieben</h1>");
                task.expected_answer = "1";
            } else {
                writer.print_html_on_stage("Exit world + random number: " + random_int_from_0_to_excluding_10);
                task.expected_answer = "0";
            }*/
        };

        /* ToDo: Legt fest, wann eine Aufgabe als bearbeitet angesehen wird. Die Variable "answer" ist dabei die Taste, die gedrückt wurde.
                 Falls es für das Experiment egal ist, einfach true zurückgeben.
        *  */
        task.accepts_answer_function = (answer) => {
            //if (answer == task.expected_answer) {
                return true;
            //} else {
            //     return false;
            // }
        }

        /**
         * ToDo: Legt fest, was angezeigt wird, wenn die falsche Taste gedrückt wurde.
         */
        task.do_print_error_message = () => {
            writer.print_error_string_on_stage(
                writer.convert_string_to_html_string("Ok, there was something wrong. Dont mind. Just press the other button."));
        }

        /**
         * ToDo: Legt fest, was angezeigt wird, wenn die richtige Taste gedrückt wurde.
         */
        task.do_print_after_task_information = () => {
            writer.clear_stage();
            writer.print_html_on_stage(
                writer.convert_string_to_html_string("Ok, good answer. When you press [Enter] the experiment goes on."));
        }

        writer.print_html_on_stage("&nsp"
        );
    }
}};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
