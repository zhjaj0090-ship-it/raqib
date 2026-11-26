(() => {
  "use strict";

  const API = "https://api.alquran.cloud/v1";
  const PRAYER_API = "https://api.aladhan.com/v1";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = "raqib_app_v1";
  const PRAYERS = [
    ["Fajr", "الفجر"], ["Sunrise", "الشروق"], ["Dhuhr", "الظهر"],
    ["Asr", "العصر"], ["Maghrib", "المغرب"], ["Isha", "العشاء"]
  ];
  const messages = [
    "لا تؤجل طاعة تستطيع فعلها الآن.",
    "قليل دائم خير من كثير منقطع.",
    "اجعل لك نصيبًا من القرآن ولو صفحة.",
    "الصلاة راحة للقلب وليست عبئًا على اليوم.",
    "ابدأ يومك بذكر الله، واختمه بحمده."
  ];
  const adhkarData = {
    morning: [
      {text:"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",count:1,source:"صحيح مسلم"},
      {text:"اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.",count:1,source:"سنن الترمذي"},
      {text:"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",count:1,source:"صحيح البخاري — سيد الاستغفار"},
      {text:"رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.",count:3,source:"سنن أبي داود والترمذي"},
      {text:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",count:100,source:"صحيح مسلم"},
      {text:"قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.",count:3,source:"سورة الإخلاص — مع المعوذتين"},
      {text:"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.",count:3,source:"سورة الفلق"},
      {text:"قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ.",count:3,source:"سورة الناس"}
    ],
    evening: [
      {text:"أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",count:1,source:"صحيح مسلم"},
      {text:"اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.",count:1,source:"سنن الترمذي"},
      {text:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",count:3,source:"صحيح مسلم"},
      {text:"رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.",count:3,source:"سنن أبي داود والترمذي"},
      {text:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",count:100,source:"صحيح مسلم"},
      {text:"آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ... لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا.",count:1,source:"آخر آيتين من سورة البقرة"}
    ],
    sleep: [
      {text:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.",count:1,source:"صحيح البخاري"},
      {text:"اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.",count:3,source:"سنن أبي داود"},
      {text:"سُبْحَانَ اللَّهِ.",count:33,source:"صحيح البخاري ومسلم"},
      {text:"الْحَمْدُ لِلَّهِ.",count:33,source:"صحيح البخاري ومسلم"},
      {text:"اللَّهُ أَكْبَرُ.",count:34,source:"صحيح البخاري ومسلم"}
    ],
    afterPrayer: [
      {text:"أَسْتَغْفِرُ اللَّهَ.",count:3,source:"صحيح مسلم"},
      {text:"اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.",count:1,source:"صحيح مسلم"},
      {text:"سُبْحَانَ اللَّهِ.",count:33,source:"صحيح مسلم"},
      {text:"الْحَمْدُ لِلَّهِ.",count:33,source:"صحيح مسلم"},
      {text:"اللَّهُ أَكْبَرُ.",count:33,source:"صحيح مسلم"},
      {text:"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",count:1,source:"صحيح مسلم"}
    ]
  };
  const categoryNames = {morning:"أذكار الصباح",evening:"أذكار المساء",sleep:"أذكار النوم",afterPrayer:"أذكار بعد الصلاة"};
  let state = loadState();
  let surahs = [];
  let currentSurah = null;
  let prayerTimes = null;
  let prayerDateKey = "";
  let countdownTimer = null;
  let reminderTimer = null;
  let activeCategory = "morning";

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        lastRead: saved.lastRead || null,
        bookmarks: Array.isArray(saved.bookmarks) ? saved.bookmarks : [],
        city: saved.city || "Cairo",
        country: saved.country || "Egypt",
        method: Number.isInteger(saved.method) ? saved.method : 5,
        notifications: !!saved.notifications,
        vibration: saved.vibration !== false,
        counts: saved.counts || {},
        notified: saved.notified || {}
      };
    } catch (_) {
      return {lastRead:null,bookmarks:[],city:"Cairo",country:"Egypt",method:5,notifications:false,vibration:true,counts:{},notified:{}};
    }
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function showView(name) {
    $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));
    $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.nav === (name === "reader" ? "quran" : name)));
    window.scrollTo({top:0,behavior:"smooth"});
    if (name === "quran" && !surahs.length) loadSurahs();
  }
  function formatTime(time) {
    if (!time) return "--:--";
    const [h,m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "م" : "ص";
    const hour = h % 12 || 12;
    return `${String(hour).padStart(2,"0")}:${String(m).padStart(2,"0")} ${suffix}`;
  }
  function cleanTime(value) { return String(value || "").split(" ")[0].slice(0,5); }
  function localDateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }
  function renderDate() {
    const now = new Date();
    $("#todayDate").textContent = new Intl.DateTimeFormat("ar-EG",{weekday:"long",day:"numeric",month:"long"}).format(now);
    $("#dailyMessage").textContent = messages[Math.floor((now.getFullYear()*372 + now.getMonth()*31 + now.getDate()) % messages.length)];
  }
  async function fetchJson(url) {
    const response = await fetch(url, {cache:"no-store"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json.code && json.code !== 200) throw new Error(json.status || "تعذر تحميل البيانات");
    return json;
  }
  async function loadPrayerTimes(lat, lon, label) {
    $("#prayerGrid").innerHTML = '<div class="loading-card">جارٍ تحديث مواقيت الصلاة...</div>';
    try {
      let url;
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        url = `${PRAYER_API}/timings/${Math.floor(Date.now()/1000)}?latitude=${lat}&longitude=${lon}&method=${state.method}`;
      } else {
        url = `${PRAYER_API}/timingsByCity/${Math.floor(Date.now()/1000)}?city=${encodeURIComponent(state.city)}&country=${encodeURIComponent(state.country)}&method=${state.method}`;
      }
      const result = await fetchJson(url);
      prayerTimes = result.data.timings;
      prayerDateKey = localDateKey();
      $("#locationNote").textContent = `الموقع: ${label || `${state.city}، ${state.country}`} • طريقة الحساب: أم القرى/الطريقة المختارة`;
      if (label) $("#cityStatus").textContent = `تم استخدام ${label} لحساب المواقيت.`;
      renderPrayerGrid();
      updateNextPrayer();
      clearInterval(countdownTimer);
      countdownTimer = setInterval(updateNextPrayer, 1000);
      clearInterval(reminderTimer);
      reminderTimer = setInterval(checkPrayerNotifications, 15000);
      checkPrayerNotifications();
    } catch (error) {
      $("#prayerGrid").innerHTML = '<div class="loading-card">تعذر تحميل المواقيت. تحقق من اتصال الإنترنت ثم أعد المحاولة من الإعدادات.</div>';
      $("#locationNote").textContent = "لم يتم تحميل مواقيت الصلاة.";
      console.error(error);
    }
  }
  function renderPrayerGrid() {
    const now = new Date();
    const nowMinutes = now.getHours()*60 + now.getMinutes();
    const next = getNextPrayer();
    $("#prayerGrid").innerHTML = PRAYERS.map(([key,label]) => {
      const t = cleanTime(prayerTimes[key]);
      const [h,m] = t.split(":").map(Number);
      const isNext = next && next.key === key;
      return `<div class="prayer-card ${isNext?"next":""}"><span>${label}${key==="Sunrise"?" ☀":""}</span><strong>${formatTime(t)}</strong></div>`;
    }).join("");
  }
  function getNextPrayer() {
    if (!prayerTimes) return null;
    const now = new Date();
    const current = now.getHours()*60 + now.getMinutes() + now.getSeconds()/60;
    const keys = ["Fajr","Dhuhr","Asr","Maghrib","Isha"];
    for (const key of keys) {
      const [h,m] = cleanTime(prayerTimes[key]).split(":").map(Number);
      if (h*60+m > current) return {key,label:PRAYERS.find(p=>p[0]===key)[1],minutes:h*60+m};
    }
    const [h,m] = cleanTime(prayerTimes.Fajr).split(":").map(Number);
    return {key:"Fajr",label:"الفجر",minutes:h*60+m+1440};
  }
  function updateNextPrayer() {
    if (!prayerTimes) return;
    if (prayerDateKey !== localDateKey()) {
      loadPrayerTimes();
      return;
    }
    const next = getNextPrayer();
    if (!next) return;
    const now = new Date();
    let target = new Date(now);
    target.setHours(0,0,0,0);
    target = new Date(target.getTime()+next.minutes*60000);
    let diff = Math.max(0,target-now);
    const hours = Math.floor(diff/3600000);
    const mins = Math.floor((diff%3600000)/60000);
    const secs = Math.floor((diff%60000)/1000);
    $("#nextPrayerName").textContent = next.label;
    $("#nextPrayerTime").textContent = formatTime(cleanTime(prayerTimes[next.key]));
    $("#nextPrayerCountdown").textContent = `متبقي ${hours} ساعة و${mins} دقيقة و${secs} ثانية`;
    renderPrayerGrid();
  }
  function checkPrayerNotifications() {
    if (!state.notifications || !prayerTimes || !("Notification" in window) || Notification.permission !== "granted") return;
    const now = new Date();
    const keyDate = localDateKey();
    for (const [key,label] of PRAYERS) {
      if (key === "Sunrise") continue;
      const t = cleanTime(prayerTimes[key]);
      const [h,m] = t.split(":").map(Number);
      const scheduled = new Date(); scheduled.setHours(h,m,0,0);
      const diff = Math.abs(now-scheduled);
      const id = `${keyDate}-${key}`;
      if (diff < 45000 && !state.notified[id]) {
        new Notification(`حان الآن وقت صلاة ${label}`, {body:"حيّ على الصلاة، حيّ على الفلاح.",tag:id});
        state.notified[id] = true;
        saveState();
      }
    }
  }
  async function enableNotifications() {
    if (!("Notification" in window)) { toast("المتصفح لا يدعم إشعارات الويب."); return false; }
    if (!window.isSecureContext) { toast("التنبيهات تحتاج HTTPS أو localhost."); return false; }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") { toast("لم يتم السماح بالإشعارات من إعدادات المتصفح."); return false; }
    state.notifications = true; saveState(); updateSettingsUI();
    toast("تم تفعيل التنبيهات أثناء تشغيل التطبيق.");
    return true;
  }
  function loadSurahs() {
    $("#surahList").innerHTML = '<div class="loading-card">جارٍ تحميل فهرس القرآن...</div>';
    fetchJson(`${API}/surah`).then(result => {
      surahs = result.data;
      renderSurahs();
      updateLastReadUI();
    }).catch(error => {
      $("#surahList").innerHTML = '<div class="loading-card">تعذر تحميل فهرس القرآن. تحقق من الإنترنت وحاول مجددًا.</div>';
      console.error(error);
    });
  }
  function renderSurahs(filter="") {
    const query = filter.trim().toLowerCase();
    const filtered = surahs.filter(s => String(s.number).includes(query) || s.name.includes(query) || s.englishName.toLowerCase().includes(query));
    $("#surahCount").textContent = `${filtered.length} سورة`;
    $("#surahList").innerHTML = filtered.map(s => `
      <button class="surah-item" data-surah="${s.number}">
        <span class="surah-number">${s.number}</span>
        <span class="surah-info"><strong>${escapeHtml(s.name)}</strong><small>${s.revelationType==="Meccan"?"مكية":"مدنية"} • ${s.numberOfAyahs} آية</small></span>
        <span class="surah-arabic">${escapeHtml(s.name)}</span>
      </button>`).join("") || '<div class="loading-card">لا توجد سورة بهذا الاسم.</div>';
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }
  async function openSurah(number, ayahNumber=1) {
    showView("reader");
    $("#ayahContainer").innerHTML = '<div class="loading-card">جارٍ تحميل آيات السورة...</div>';
    try {
      const result = await fetchJson(`${API}/surah/${number}`);
      currentSurah = result.data;
      const meta = currentSurah.revelationType==="Meccan"?"مكية":"مدنية";
      $("#readerTitle").textContent = currentSurah.name;
      $("#readerMeta").textContent = `${meta} • ${currentSurah.numberOfAyahs} آية`;
      $("#basmala").style.display = number===1 || number===9 ? "none" : "block";
      $("#ayahContainer").innerHTML = currentSurah.ayahs.map(ayah => `
        <article class="ayah" id="ayah-${ayah.numberInSurah}">
          <span>${escapeHtml(ayah.text)}</span> <span class="ayah-end">۞${ayah.numberInSurah}</span>
          <div class="ayah-tools"><button data-save-ayah="${ayah.numberInSurah}">حفظ موضع</button></div>
        </article>`).join("");
      state.lastRead = {surah:number,ayah:ayahNumber,name:currentSurah.name};
      saveState(); updateLastReadUI();
      if (ayahNumber > 1) setTimeout(() => $(`#ayah-${ayahNumber}`)?.scrollIntoView({behavior:"smooth",block:"center"}),150);
      else window.scrollTo({top:0,behavior:"smooth"});
    } catch (error) {
      $("#ayahContainer").innerHTML = '<div class="loading-card">تعذر تحميل السورة. تحقق من اتصال الإنترنت وحاول مرة أخرى.</div>';
      console.error(error);
    }
  }
  function updateLastReadUI() {
    if (!state.lastRead) return;
    $("#lastReadLabel").textContent = state.lastRead.name || `السورة رقم ${state.lastRead.surah}`;
    $("#lastReadDetail").textContent = `السورة ${state.lastRead.surah} • الآية ${state.lastRead.ayah || 1}`;
  }
  function saveBookmark(ayah=1) {
    if (!currentSurah) return;
    const item = {surah:currentSurah.number,ayah,name:currentSurah.name};
    const exists = state.bookmarks.some(b=>b.surah===item.surah && b.ayah===item.ayah);
    if (!exists) state.bookmarks.push(item);
    state.lastRead = item; saveState(); updateLastReadUI();
    toast(exists ? "هذه العلامة محفوظة بالفعل." : "تم حفظ موضع القراءة.");
  }
  function renderAdhkar() {
    const items = adhkarData[activeCategory];
    const keyDate = localDateKey();
    const counts = state.counts[keyDate] || {};
    const completed = items.reduce((sum,item,index)=>sum+Math.min(counts[`${activeCategory}-${index}`]||0,item.count),0);
    const total = items.reduce((sum,item)=>sum+item.count,0);
    $("#adhkarProgress").textContent = `${completed} / ${total}`;
    $("#adhkarProgressBar").style.width = `${total ? completed/total*100 : 0}%`;
    $("#adhkarList").innerHTML = items.map((item,index) => {
      const count = Math.min(counts[`${activeCategory}-${index}`]||0,item.count);
      const done = count >= item.count;
      return `<article class="dhikr-card"><p>${item.text}</p><div class="dhikr-bottom"><span class="dhikr-source">${escapeHtml(item.source)} • المطلوب ${item.count}</span><button class="count-button ${done?"done":""}" data-count="${index}" ${done?"disabled":""}>${done?"اكتمل ✓":`${count} / ${item.count}  +`}</button></div></article>`;
    }).join("");
  }
  function incrementDhikr(index) {
    const date = localDateKey();
    state.counts[date] ||= {};
    const key = `${activeCategory}-${index}`;
    const max = adhkarData[activeCategory][index].count;
    state.counts[date][key] = Math.min(max,(state.counts[date][key]||0)+1);
    saveState();
    if (state.vibration && navigator.vibrate && state.counts[date][key]===max) navigator.vibrate(40);
    renderAdhkar();
  }
  function updateSettingsUI() {
    $("#notificationToggle").classList.toggle("on",state.notifications);
    $("#notificationStatus").textContent = state.notifications ? "مفعّلة — أثناء تشغيل الصفحة" : "غير مفعّلة";
    $("#vibrationToggle").classList.toggle("on",state.vibration);
    $("#notificationBtn").textContent = state.notifications ? "♧" : "♧";
  }
  function useLocation() {
    if (!navigator.geolocation) { toast("تحديد الموقع غير متاح في هذا المتصفح."); return; }
    $("#cityStatus").textContent = "جارٍ تحديد موقعك...";
    navigator.geolocation.getCurrentPosition(
      pos => loadPrayerTimes(pos.coords.latitude,pos.coords.longitude,"موقعك الحالي"),
      err => { $("#cityStatus").textContent = "تعذر الوصول للموقع. اسمح بإذن الموقع أو أدخل المدينة يدويًا."; toast("لم نتمكن من تحديد موقعك."); },
      {enableHighAccuracy:false,timeout:12000,maximumAge:600000}
    );
  }
  function bindEvents() {
    document.addEventListener("click", event => {
      const nav = event.target.closest("[data-nav]");
      if (nav) { event.preventDefault(); showView(nav.dataset.nav); }
      const surah = event.target.closest("[data-surah]");
      if (surah) openSurah(Number(surah.dataset.surah));
      const count = event.target.closest("[data-count]");
      if (count) incrementDhikr(Number(count.dataset.count));
      const saveAyah = event.target.closest("[data-save-ayah]");
      if (saveAyah) saveBookmark(Number(saveAyah.dataset.saveAyah));
    });
    $("#settingsShortcut").addEventListener("click",()=>showView("settings"));
    $("#notificationBtn").addEventListener("click",enableNotifications);
    $("#continueBtn").addEventListener("click",()=>state.lastRead ? openSurah(state.lastRead.surah,state.lastRead.ayah) : showView("quran"));
    $("#surahSearch").addEventListener("input",e=>renderSurahs(e.target.value));
    $("#bookmarkCurrent").addEventListener("click",()=>saveBookmark(state.lastRead?.ayah||1));
    $("#previousSurah").addEventListener("click",()=>currentSurah && openSurah(Math.max(1,currentSurah.number-1)));
    $("#nextSurah").addEventListener("click",()=>currentSurah && openSurah(Math.min(114,currentSurah.number+1)));
    $("#adhkarTabs").addEventListener("click",e=>{
      const tab=e.target.closest("[data-category]"); if(!tab)return;
      activeCategory=tab.dataset.category;
      $$(".adhkar-tab").forEach(t=>t.classList.toggle("active",t===tab));
      renderAdhkar();
    });
    $("#resetAdhkar").addEventListener("click",()=>{
      if(!confirm("هل تريد إعادة عدّ هذا القسم لهذا اليوم؟"))return;
      const date=localDateKey();
      Object.keys(state.counts[date]||{}).filter(k=>k.startsWith(`${activeCategory}-`)).forEach(k=>delete state.counts[date][k]);
      saveState();renderAdhkar();toast("تمت إعادة العداد.");
    });
    $("#useLocation").addEventListener("click",useLocation);
    $("#searchCity").addEventListener("click",()=>{
      const city=$("#cityInput").value.trim();
      if(!city){toast("اكتب اسم المدينة أولًا.");return;}
      state.city=city;state.country="Egypt";saveState();
      loadPrayerTimes(null,null,`${city}، مصر`);
    });
    $("#notificationToggle").addEventListener("click",async()=>{
      if(state.notifications){state.notifications=false;saveState();updateSettingsUI();toast("تم إيقاف التنبيهات.");}
      else await enableNotifications();
    });
    $("#vibrationToggle").addEventListener("click",()=>{
      state.vibration=!state.vibration;saveState();updateSettingsUI();
    });
    $("#clearData").addEventListener("click",()=>{
      if(!confirm("سيتم حذف العلامات وآخر قراءة والإعدادات والعدادات المحفوظة على هذا الجهاز. هل تريد المتابعة؟"))return;
      localStorage.removeItem(STORAGE_KEY);state=loadState();updateSettingsUI();renderAdhkar();updateLastReadUI();toast("تم مسح بيانات هذا الجهاز.");
    });
  }
  function init() {
    renderDate();bindEvents();renderAdhkar();updateSettingsUI();updateLastReadUI();
    loadPrayerTimes();
    loadSurahs();
  }
  document.addEventListener("DOMContentLoaded",init);
})();