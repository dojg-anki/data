

# Extract the data from "cleaned" view of the original Anki TSV data which was imported into "DB Browser for SQLite".
sqlite3 dojg.db '.mode json' "select * from dojg_all_cleaned where level == 'Basic'" | jq "." > ./cleaned_data/dojg_basic_cleaned.json
sqlite3 dojg.db '.mode json' "select * from dojg_all_cleaned where level == 'Intermediate'" | jq "." > ./cleaned_data/dojg_intermediate_cleaned.json
sqlite3 dojg.db '.mode json' "select * from dojg_all_cleaned where level == 'Advanced'" | jq "." > ./cleaned_data/dojg_advanced_cleaned.json
sqlite3 dojg.db '.mode json' "select * from dojg_all_cleaned" | jq "." > ./cleaned_data/dojg_all_cleaned.json

# Run the node,js script to group the sentences by grammar point.
node group_sentences.js
