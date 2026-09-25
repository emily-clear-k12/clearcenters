import json,glob,re,sys
SHAPES={"rect","square","diamond","trap","rhombus","para","tri"}
bad=0
def err(c,m):
    global bad; bad+=1; print(f"  ✗ {c}: {m}")
import os
D=sys.argv[1] if len(sys.argv)>1 else "."
for f in sorted(glob.glob(os.path.join(D,"*-CL.json"))):
    c=json.load(open(f)); cid=c["id"]; print(cid)
    assert re.match(r"^(SCI|ELAR|MA|SS)-[345]\.\d+[A-Z]?-CL$",cid) or err(cid,"id format")
    g=int(c["grade"][-1]); ids=[]
    p1,p2=c["pages"]
    if len(c["pages"])!=2: err(cid,"pages != 2")
    if len(p1["groups"])!=2 or any(x["id"]=="neither" for x in p1["groups"]): err(cid,"p1 groups")
    if [x["id"] for x in p2["groups"]]!=[x["id"] for x in p1["groups"]]+["neither"]: err(cid,"p2 groups must be p1 + neither")
    for n,p in ((1,p1),(2,p2)):
        if len(p["items"])!=6: err(cid,f"p{n} has {len(p['items'])} items")
        gids={x["id"] for x in p["groups"]}
        for it in p["items"]:
            ids.append(it["id"])
            if it["group"] not in gids: err(cid,f"{it['id']} bad group")
            if "imageNote" in it and "shape" in it: err(cid,f"{it['id']} photo+shape")
            if "shape" in it and it["shape"] not in SHAPES: err(cid,"unknown shape")
        used={it["group"] for it in p["items"]}
        if used!=gids: err(cid,f"p{n} group(s) unused: {gids-used}")
    V=c["venn"]; L=[x["id"] for x in V["labels"]]
    if len(V["items"])!=6: err(cid,"venn != 6")
    kinds=set()
    for it in V["items"]:
        ids.append(it["id"]); s=set(it["sets"])
        if not s<=set(L): err(cid,"venn bad set id")
        kinds.add(frozenset(s))
    for need in [frozenset(),frozenset(L),frozenset([L[0]]),frozenset([L[1]])]:
        if need not in kinds: err(cid,f"venn missing region {set(need) or 'neither'}")
    if len(ids)!=len(set(ids)): err(cid,"duplicate item ids")
    mc=V["mc"]; 
    if mc["answer"] not in [x["id"] for x in mc["choices"]]: err(cid,"mc answer")
    mu=V["multi"]; mids=[x["id"] for x in mu["choices"]]
    if len(mu["answers"])<2 or len(mu["answers"])>=len(mids) or not set(mu["answers"])<=set(mids): err(cid,"multi answers")
    il=V["inline"]
    if il["answer"] not in [x["id"] for x in il["choices"]]: err(cid,"inline answer")
    if len(c["defs"])!=3: err(cid,"defs != 3")
    # definitions / notThis must not name an item label
    labels=[it["label"].lower() for p in c["pages"] for it in p["items"]]+[it["label"].lower() for it in V["items"]]
    texts=[d["text"].lower() for L_ in c["defs"] for d in L_]+[p["notThis"].lower() for p in c["pages"]]
    for t in texts:
        for lb in labels:
            if len(lb)>3 and lb in t: err(cid,f"'{lb}' named in: {t}")
    # lengths
    wc=lambda s: len(s.split())
    caps={3:(10,12),4:(14,16),5:(16,20)}[g]; MAXS={3:16,4:21,5:25}[g]
    for p in c["pages"]:
        for s in re.split(r"(?<=[.!?])\s+",p["rule"]):
            if wc(s)>caps[0]: err(cid,f"long rule sentence ({wc(s)}w): {s}")
        for it in p["items"]:
            ss=re.split(r"(?<=[.!?])\s+",it["label"])
            if len(ss)>2: err(cid,f"item has more than 2 sentences: {it['label']}")
            for s_ in ss:
                if wc(s_)>caps[1]: err(cid,f"long item sentence ({wc(s_)}w): {s_}")
            if wc(it.get("clue",""))>7: err(cid,f"clue over 7 words: {it['clue']}")
    for x in [y for p in c["pages"] for y in p["groups"]]+V["labels"]:
        t=x.get("label",x.get("text"))
        if wc(t)>4: err(cid,f"label too long for a button: {t}")
    # all student-facing sentences
    allt=[c["title"]]+[p["rule"] for p in c["pages"]]+[p["notThis"] for p in c["pages"]]+[i["clue"] for p in c["pages"] for i in p["items"]]\
        +[mc["prompt"]]+[x["text"] for x in mc["choices"]+mu["choices"]]+[mu["prompt"]]+[d["text"] for L_ in c["defs"] for d in L_]
    longest=max((s for t in allt for s in re.split(r"(?<=[.!?])\s+",t)),key=wc)
    allt+= [i["label"] for i in V["items"]]+[it["label"] for p in c["pages"] for it in p["items"]]
    sents=[s for t in allt for s in re.split(r"(?<=[.!?])\s+",t) if s.strip()]
    for s_ in sents:
        if wc(s_)>MAXS: err(cid,f"sentence over grade max {MAXS} ({wc(s_)}w): {s_}")
    for k in ["id","subject","grade","title","teks","learningTarget","lessonSummary","trap","pages","venn","defs"]:
        if k not in c: err(cid,f"missing field {k}")
    if c["subject"] not in ["Science","ELAR","Math","Social Studies"]: err(cid,"subject name")
    if not cid.split("-")[1].startswith(f"{g}.") or cid.split("-")[1][:-0 or None]!=c["teks"].split("(")[0]: err(cid,f"id/teks mismatch {cid} vs {c['teks']}")
    for L_,pg in zip(c["defs"],[p1,p2,None]):
        if pg:
            terms=[d["term"] for d in L_]; want=[x["label"] for x in pg["groups"]]
            if terms!=want: err(cid,f"defs terms {terms} != group labels {want}")
    vt=[d["term"] for d in c["defs"][2]]
    if vt!=[V["labels"][0]["text"],V["labels"][1]["text"],"Center","Outside"]: err(cid,f"venn defs terms {vt}")
    print(f"  longest student sentence: {wc(longest)}w — {longest}")
print("\nALL CHECKS PASS" if not bad else f"\n{bad} problem(s)"); sys.exit(1 if bad else 0)
