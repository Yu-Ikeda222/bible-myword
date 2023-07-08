#!/bin/sh
DB="/Users/ikedayu/MyWord/database.db'"
IMPORT_DIR="/Users/ikedayu/bible/new"

cd $(dirname $0)

import_files="${IMPORT_DIR}/*.txt"

for file_path in $import_files; do
    file_name=$(basename $file_path)
    table_name=${file_name%.*}
    temp_file=$(mktemp)
    sed -e '1d' $file_path > $temp_file # 先頭行を削除
    sqlite3 -separator , $DB ".import ${temp_file} sentences"
    rm $temp_file
done
