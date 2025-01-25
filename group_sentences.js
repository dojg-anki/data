/**
 * Helper script to group all the sentences by grammar point.
 *
 */

var fs = require("node:fs");

var audio_filename_mapping = JSON.parse(fs.readFileSync("./source_data/media", "utf8"))
var afm_invert = {}
for(var key in audio_filename_mapping) {
    afm_invert[audio_filename_mapping[key]] = key
}

//console.log(afm_invert)

function group(level) {
    var file = fs.readFileSync("./cleaned_data/dojg_" + level + "_cleaned.json", "utf8")

    //`console.log(file)

    var data = JSON.parse(file)

    //console.log(data)

    var grammarPoints = {};

    // Loop over all the
    data.forEach(function(it) {
        var gp_key = it.grammar_point + "_" + it.book_page

        if(grammarPoints[gp_key] == undefined) {
            grammarPoints[gp_key] = {
                "grammar_point": it.grammar_point,
                "translation": it.translation,
                "explanation": it.explanation,
                "sentences": []
            }
        }

        var audioString = it.audio.replace("[sound:", "").replace("]", "")
        var sentence = {
            japanese: it.japanese,
            reading: it.reading,
            english: it.english,
            extra_notes: it.extra_notes,
            audio: audioString,
            audio_filename: afm_invert[audioString]
        }
        console.log(sentence)
        grammarPoints[gp_key].sentences.push()
    })

    //console.log(grammarPoints)

    fs.writeFileSync("./cleaned_grouped_data/dojg_" + level + "_cleaned_grouped.json", JSON.stringify(grammarPoints, null, " "))
};

["basic", "intermediate", "advanced", "all"].forEach(function(it) {
    group(it)
});
