// ClearDecode skill ladder (Sept 30, 2026). Design: claude/ClearDecode_Design_v1.md,
// content map: claude/ClearDecode_Content_Plan_v1.md.
//
// Order follows UFLI Foundations exactly (Emily, Sept 30), with grade 3-5 TEKS
// ruins added after UFLI's last lesson. Every ruin = one pattern = about a week.
//
// Each ruin carries a placement probe (4 quick items) used by the placement
// scan ("Scan the ruins"):
//   pick:  [target, foil, foil]   hear a real word, tap its spelling
//   spell: { parts, extra }        hear a real word, build it from chips
//   alien: [[target, foil, foil], [target, foil, foil]]  made-up words
// The first entry is always the answer; screens shuffle the options.
// Foils are never homophones of the answer (that would make two right answers).
//
// Content is tagged by pattern, never by grade. Standards are per-state lists
// (TEKS now) so other states can be added without touching content.

// Planet names (naming pass, Sept 30, 2026): each one fits the crew's story
// on that planet. Students see these on the map; teachers see id + name.
export const PLANETS = [
  { id: "A", name: "Mudfall", skill: "Short vowels" },
  { id: "B", name: "Ashmoor", skill: "Consonant teams" },
  { id: "C", name: "Hollowstone", skill: "Silent e" },
  { id: "D", name: "Dusk", skill: "Longer words" },
  { id: "E", name: "Coldrim", skill: "Ending patterns" },
  { id: "F", name: "Stormhold", skill: "Vowels with r" },
  { id: "G", name: "Tidewater", skill: "Long vowel teams" },
  { id: "H", name: "The Far Ports", skill: "More vowel teams" },
  { id: "I", name: "Frostreach", skill: "Word parts I" },
  { id: "J", name: "The Long Dark", skill: "Advanced patterns" },
  { id: "K", name: "Haven", skill: "Word parts II" },
];

// Planets A-I launch first; J-K follow right after (decided Sept 30).
export const LAUNCH_PLANETS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const r = (id, pattern, ufli, teks, pick, spell, alien) => ({ id, planet: id[0], pattern, ufli, standards: { TX: teks }, probe: { pick, spell, alien } });
const sp = (parts, extra) => ({ word: parts.join(""), parts, extra });

export const RUINS = [
  // ---- A · Short vowels ----
  r("A1", "short a, short i", "35-36", ["3.2(A)(ii)"], ["lab", "lib", "lob"], sp(["f", "i", "x"], ["a", "e"]), [["vab", "veb", "vib"], ["tig", "tag", "tug"]]),
  r("A2", "short o", "37-38", ["3.2(A)(ii)"], ["rod", "rid", "red"], sp(["c", "o", "g"], ["a", "u"]), [["vot", "vat", "vit"], ["zog", "zag", "zug"]]),
  r("A3", "short u", "39", ["3.2(A)(ii)"], ["hub", "hob", "hib"], sp(["m", "u", "d"], ["o", "a"]), [["gub", "gab", "gib"], ["nuz", "naz", "noz"]]),
  r("A4", "short e", "40", ["3.2(A)(ii)"], ["jet", "jot", "jut"], sp(["w", "e", "b"], ["i", "u"]), [["vep", "vap", "vip"], ["teb", "tab", "tub"]]),
  r("A5", "all short vowels + -s", "19-21, 41", ["3.2(A)(ii)", "4.2(A)(i)"], ["cogs", "cags", "cugs"], sp(["m", "a", "p", "s"], ["e", "o"]), [["lums", "lams", "lems"], ["fids", "fads", "feds"]]),
  // ---- B · Consonant teams ----
  r("B1", "ff, ll, ss, zz; -all, -oll, -ull", "42-43", ["3.2(B)(i)"], ["stall", "still", "stull"], sp(["c", "l", "i", "ff"], ["f", "ll"]), [["zell", "zall", "zill"], ["bloss", "bliss", "bluss"]]),
  r("B2", "ck", "44", ["3.2(B)(i)"], ["dock", "deck", "duck"], sp(["t", "r", "a", "ck"], ["c", "k"]), [["vick", "vock", "vack"], ["zuck", "zeck", "zack"]]),
  r("B3", "sh, th", "45-47", ["3.2(B)(i)"], ["path", "pass", "pat"], sp(["sh", "i", "p"], ["s", "ch"]), [["thep", "tep", "shep"], ["shom", "som", "thom"]]),
  r("B4", "ch, wh, ph", "48-50", ["3.2(B)(i)"], ["chip", "ship", "tip"], sp(["g", "r", "a", "ph"], ["f", "p"]), [["chim", "shim", "kim"], ["chud", "shud", "tud"]]),
  r("B5", "ng, nk", "51-52", ["3.2(B)(i)"], ["bank", "bang", "ban"], sp(["t", "r", "u", "nk"], ["ng", "n"]), [["vung", "vunk", "vun"], ["frink", "fring", "frin"]]),
  r("B6", "blends", "49, 53", ["3.2(B)(i)"], ["drift", "dift", "drif"], sp(["b", "l", "a", "s", "t"], ["r", "d"]), [["skrom", "krom", "skom"], ["plund", "pund", "plun"]]),
  // ---- C · Silent e ----
  r("C1", "a_e", "54", ["3.2(A)(ii)"], ["crate", "crat", "crit"], sp(["p", "l", "a", "n", "e"], ["i", "o"]), [["vabe", "vab", "veb"], ["strade", "strad", "strid"]]),
  r("C2", "i_e", "55", ["3.2(A)(ii)"], ["glide", "glid", "glad"], sp(["d", "r", "i", "v", "e"], ["a", "o"]), [["brime", "brim", "bram"], ["zike", "zik", "zake"]]),
  r("C3", "o_e, u_e, e_e", "56-59", ["3.2(A)(ii)"], ["probe", "prob", "prib"], sp(["c", "u", "b", "e"], ["o", "a"]), [["flome", "flom", "flume"], ["dute", "dut", "dote"]]),
  r("C4", "soft c and g: _ce, _ge", "60-62", ["3.2(A)(ii)"], ["stage", "stag", "stack"], sp(["s", "p", "a", "c", "e"], ["s", "k"]), [["plice", "plike", "plick"], ["moge", "mog", "mag"]]),
  // ---- D · Longer words ----
  r("D1", "endings -es, -ed, -ing", "63-65", ["3.2(A)(vi)"], ["landing", "landed", "lands"], sp(["b", "o", "x", "es"], ["s", "is"]), [["vlamming", "vlammed", "vlams"], ["tusking", "tusked", "tusks"]]),
  r("D2", "syllables; compound words; closed + closed", "66-67", ["3.2(A)(iii)", "3.2(A)(iv)"], ["upload", "unload", "upward"], sp(["sun", "set"], ["sum", "sit"]), [["zibnap", "zibnop", "zabnap"], ["tolfin", "tilfin", "talfin"]]),
  r("D3", "open and closed syllables", "68", ["3.2(A)(iv)"], ["robot", "robbot", "rabot"], sp(["p", "i", "l", "o", "t"], ["ll", "e"]), [["vonem", "vonnem", "vanem"], ["siltog", "saltog", "seltog"]]),
  // ---- E · Ending patterns ----
  r("E1", "tch, dge", "69-71", ["3.2(B)(i)"], ["bridge", "brig", "britch"], sp(["s", "w", "i", "tch"], ["ch", "sh"]), [["plodge", "plog", "plotch"], ["vatch", "vadge", "vat"]]),
  r("E2", "long VCC: -ild, -old, -ind, -olt, -ost", "72", ["3.2(A)(ii)"], ["bolt", "belt", "built"], sp(["w", "i", "l", "d"], ["e", "a"]), [["zind", "zand", "zund"], ["frold", "frald", "freld"]]),
  r("E3", "y as long i and long e", "73-74", ["3.2(A)(ii)"], ["rocky", "rock", "rocks"], sp(["s", "k", "y"], ["i", "e"]), [["grofty", "groft", "grofts"], ["vry", "vrum", "vrod"]]),
  r("E4", "-le", "75-76", ["3.2(A)(ii)"], ["handle", "hand", "handy"], sp(["c", "a", "b", "le"], ["el", "al"]), [["zuffle", "zuff", "zuffy"], ["plindle", "plind", "plindy"]]),
  // ---- F · Vowels with r ----
  r("F1", "ar", "77", ["3.2(A)(ii)"], ["spark", "spunk", "spork"], sp(["s", "t", "ar"], ["or", "a"]), [["tharn", "than", "thorn"], ["vark", "vak", "vork"]]),
  r("F2", "or, ore", "78-79", ["3.2(A)(ii)"], ["storm", "stem", "starm"], sp(["c", "ore"], ["ar", "er"]), [["flort", "flot", "flart"], ["zorn", "zon", "zarn"]]),
  r("F3", "er, ir, ur", "80-81", ["3.2(A)(ii)"], ["first", "fist", "frost"], sp(["b", "ur", "s", "t"], ["er", "ir"]), [["vurt", "vut", "vart"], ["zerp", "zep", "zarp"]]),
  r("F4", "spelling /er/: er, ir, ur, w + or", "82-83", ["3.2(B)(i)"], ["world", "wold", "wild"], sp(["w", "or", "k", "er"], ["ur", "ir"]), [["plurm", "plum", "plarm"], ["worb", "wob", "warb"]]),
  // ---- G · Long vowel teams ----
  r("G1", "ai, ay", "84", ["3.2(A)(ii)"], ["drain", "dran", "drone"], sp(["s", "p", "r", "ay"], ["ai", "a"]), [["plaim", "plam", "plim"], ["vay", "vee", "vy"]]),
  r("G2", "ee, ea, ey", "85", ["3.2(A)(ii)"], ["steel", "stall", "stale"], sp(["s", "t", "r", "ea", "m"], ["ee", "e"]), [["fleem", "flem", "flame"], ["zeap", "zep", "zap"]]),
  r("G3", "oa, ow, oe", "86", ["3.2(A)(ii)"], ["float", "flat", "flit"], sp(["g", "l", "ow"], ["oa", "o"]), [["broap", "brop", "brap"], ["skoat", "skot", "skat"]]),
  r("G4", "ie, igh", "87-88", ["3.2(A)(ii)"], ["flight", "flit", "float"], sp(["b", "r", "igh", "t"], ["ie", "i"]), [["zight", "zit", "zat"], ["smight", "smit", "smat"]]),
  // ---- H · More vowel teams and diphthongs ----
  r("H1", "oo (book, moon), u (put)", "89-90", ["3.2(A)(ii)"], ["boost", "bust", "best"], sp(["h", "oo", "k"], ["u", "o"]), [["froom", "frum", "fram"], ["blook", "bluk", "blak"]]),
  r("H2", "ew, ui, ue", "91-92", ["3.2(A)(ii)"], ["crew", "craw", "cry"], sp(["s", "ui", "t"], ["ew", "oo"]), [["plew", "plow", "ply"], ["vue", "vow", "vay"]]),
  r("H3", "au, aw, augh; ea as short e", "93-94", ["3.2(A)(ii)"], ["launch", "lunch", "latch"], sp(["c", "l", "aw"], ["au", "a"]), [["fraul", "frul", "frail"], ["zaw", "zow", "zay"]]),
  r("H4", "oi, oy", "95", ["3.2(A)(ii)"], ["point", "pint", "pant"], sp(["t", "oy"], ["oi", "o"]), [["gloin", "glin", "glan"], ["smoy", "smay", "smee"]]),
  r("H5", "ou, ow (cow)", "96-97", ["3.2(A)(ii)"], ["cloud", "clod", "clued"], sp(["t", "ow", "er"], ["ou", "o"]), [["plound", "plond", "pland"], ["skout", "skot", "skit"]]),
  r("H6", "silent letters: kn, wr, mb", "98", ["3.2(A)(i)"], ["climb", "clim", "clam"], sp(["th", "u", "mb"], ["m", "b"]), [["knipe", "nip", "nep"], ["wrade", "rad", "red"]]),
  // ---- I · Word parts I ----
  r("I1", "-s/-es, -er/-est", "99-100", ["3.2(A)(vi)", "4.2(A)(i)"], ["faster", "fastest", "fasts"], sp(["c", "o", "l", "d", "est"], ["ist", "er"]), [["vlimpest", "vlimper", "vlimps"], ["groshes", "groshers", "groshing"]]),
  r("I2", "-ly, -less, -ful", "101-102", ["3.2(A)(vi)", "3.3(C)"], ["fearless", "fearful", "fearing"], sp(["qu", "i", "ck", "ly"], ["lee", "le"]), [["bloofful", "bloofless", "bloofly"], ["zently", "zentful", "zentless"]]),
  r("I3", "prefixes un-, pre-, re-", "103-104", ["3.2(A)(v)", "3.3(C)"], ["restart", "prestart", "unstart"], sp(["un", "l", "o", "ck"], ["in", "on"]), [["previm", "revim", "unvim"], ["unplaze", "replaze", "preplaze"]]),
  r("I4", "dis-; affix review", "105-106", ["3.2(A)(v)", "3.3(C)"], ["disconnect", "reconnect", "unconnect"], sp(["dis", "l", "i", "k", "e"], ["des", "diss"]), [["disprob", "reprob", "unprob"], ["disfelt", "refelt", "unfelt"]]),
  r("I5", "doubling rule", "107-108", ["3.2(A)(vi)"], ["planning", "planing", "plans"], sp(["s", "t", "o", "pp", "ed"], ["p", "t"]), [["vabbed", "vabed", "vabs"], ["zipping", "ziping", "zips"]]),
  r("I6", "drop e; y to i", "109-110", ["3.2(A)(vi)"], ["saving", "savving", "saves"], sp(["c", "r", "i", "ed"], ["y", "ie"]), [["floking", "flokking", "flokes"], ["zaped", "zapped", "zaping"]]),
  // ---- J · Advanced patterns ----
  r("J1", "ar, or as /er/; air, are, ear", "111-113", ["3.2(A)(i)"], ["repair", "repeer", "repour"], sp(["g", "ear"], ["eer", "er"]), [["plair", "pleer", "plore"], ["zare", "zore", "zire"]]),
  r("J2", "ei, eigh, ey, ea as long a", "114", ["3.2(A)(i)"], ["weigh", "wee", "why"], sp(["f", "r", "eigh", "t"], ["ai", "a"]), [["bleigh", "blee", "bly"], ["zeight", "zite", "zeet"]]),
  r("J3", "ew, eu, ue, ou as /oo/; ough", "115-116", ["3.2(A)(i)"], ["group", "grope", "grip"], sp(["r", "e", "s", "c", "ue"], ["ew", "oo"]), [["skroup", "skrope", "skrip"], ["zew", "zow", "zee"]]),
  r("J4", "soft c and g; ch as /sh/ and /k/; gn, gh, silent t", "117-118", ["3.2(A)(i)"], ["giant", "gant", "grant"], sp(["c", "y", "c", "le"], ["s", "k"]), [["cipe", "kipe", "cap"], ["cyde", "kide", "kid"]]),
  r("J5", "consonant changes (select, selection)", "TEKS", ["5.2(A)(i)"], ["selection", "selecting", "selective"], sp(["m", "u", "s", "i", "cian"], ["tion", "sion"]), [["plection", "plecting", "plects"], ["frisician", "frisicking", "frisics"]]),
  // ---- K · Word parts II ----
  r("K1", "-tion, -sion", "119", ["3.2(A)(vi)"], ["mission", "motion", "mansion"], sp(["s", "t", "a", "tion"], ["sion", "shun"]), [["zorption", "zorping", "zorps"], ["plantion", "planting", "plants"]]),
  r("K2", "-ture; -er, -or, -ist", "120-121", ["3.2(A)(vi)"], ["capture", "captor", "captain"], sp(["in", "v", "e", "n", "t", "or"], ["er", "ar"]), [["plinture", "plinter", "plintist"], ["zoggist", "zogger", "zogture"]]),
  r("K3", "-ish, -y, -ness, -ment", "122-125", ["3.3(C)", "4.3(C)"], ["darkness", "darkish", "darkly"], sp(["e", "qu", "i", "p", "ment"], ["mint", "mant"]), [["flobment", "flobness", "flobish"], ["grimpish", "grimpy", "grimpness"]]),
  r("K4", "-able, -ible; -ity/-ty", "126", ["4.3(C)"], ["breakable", "breaking", "breakage"], sp(["v", "i", "s", "ible"], ["able", "abel"]), [["zorpable", "zorping", "zorpity"], ["plunity", "plunable", "plunish"]]),
  r("K5", "bi-, tri-, uni-; mis-, sub-, non-, im-, in-", "127", ["3.3(C)", "4.3(C)"], ["impossible", "possible", "possibly"], sp(["mis", "p", "l", "a", "c", "e"], ["miss", "dis"]), [["tricorp", "bicorp", "unicorp"], ["subzand", "nonzand", "miszand"]]),
  r("K6", "trans-, super-, -ive, -logy", "TEKS", ["5.3(C)"], ["transport", "support", "passport"], sp(["a", "c", "t", "ive"], ["iv", "eve"]), [["supervond", "transvond", "unvond"], ["plorgology", "plorgive", "plorgish"]]),
  r("K7", "Greek roots: auto, graph, meter, photo, geo, tele, bio", "TEKS", ["4.3(C)", "5.3(C)"], ["autograph", "telegraph", "photograph"], sp(["ge", "o", "logy"], ["jee", "ology"]), [["telezorp", "autozorp", "photozorp"], ["zorpometer", "zorpograph", "zorpology"]]),
  r("K8", "Latin roots: port, struct, dict, spect, rupt, ject", "past grade 5", [], ["inspect", "insect", "inject"], sp(["e", "rupt"], ["rup", "ript"]), [["restruct", "respect", "reject"], ["portify", "portion", "port"]]),
];

export const RUIN_ORDER = RUINS.map((x) => x.id);

export function getRuin(id) {
  return RUINS.find((x) => x.id === id) || null;
}

export function ruinIndex(id) {
  return RUIN_ORDER.indexOf(id);
}

export function planetOf(id) {
  return PLANETS.find((p) => p.id === String(id || "")[0]) || null;
}

export function ruinsOfPlanet(planetId) {
  return RUINS.filter((x) => x.planet === planetId);
}

export function nextRuinId(id) {
  const i = ruinIndex(id);
  return i >= 0 && i < RUIN_ORDER.length - 1 ? RUIN_ORDER[i + 1] : null;
}

// Short teacher-facing label: "G1 · ai, ay".
export function ruinLabel(id) {
  const ru = getRuin(id);
  return ru ? `${ru.id} · ${ru.pattern}` : String(id || "");
}
