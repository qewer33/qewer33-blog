---
title: "Fault Injection (Hata Enjeksiyonu) Saldırısı: Donanım Gerçekten Güvenilir mi?"
description: Fault Injection (Hata Enjeksiyonu) saldırısı nedir? Gerçek hayat örnekleri nelerdir?
thumbnail: /images/blog/fault-injection-tr/banner.jpg
tags: [ "turkish", "embedded", "security" ]
created: 2026-2-7
--- 

## Yazılım Güvenliği ve "Hatasız Donanım" Yalanı

Modern yazılım güvenliğinin (gerek web uygulama güvenliği gibi yüksek seviyeli, gerekse de gömülü sistemler ve işletim sistemleri gibi düşük seviyeli alanlarda) dayandığı en büyük temellerden biri *yazılımın çalıştığı donanımın hatasız ve ideal olmasıdır*. Sonuçta bir donanım, yazılım çalıştırıyorsa o yazılımın doğru çalışması için öncelikle donanımın da doğru çalışması gerekir ki genel olarak da bu kaide doğru ve geçerlidir. En son ne zaman bilgisayarınızın *işlemcisinde* donanımsal bir hata olduğu için bilgisayarınızda bir hata meydana geldi? Çok büyük ihtimalle böyle bir durum hiç yaşamadınız (veya maksimum 1-2 kere donanım kaynaklı mavi ekran aldınız), çünkü modern donanımlar *normal şartlar altında* gerçekten *güvenilir ve kararlı* bir şekilde çalışmak için optimize edilmiştir.

Peki... ya şartlar normal değilse???

## Fault Injection nedir?

Gömülü sistem güvenliğinde (embedded security) en yaygın saldırı mekanizmalarından biri **Fault Injection**, yani **Hata Enjeksiyonu** saldırısıdır. Bu saldırıda amaç, donanımın çalışmasını *fiziksel olarak anormal bir şekilde* etkileyerek donanımda *olağan dışı bir hata oluşmasını sağlamak ve bu hatadan faydalanmaktır (exploit)*.

![Bir hata enjeksiyonu saldırısı ekipmanı](/images/blog/fault-injection-tr/setup.jpg)

Hata enjeksiyonu saldırısı gerçekleştirmenin ve saldırı sonucunda oluşan açıklardan faydalanmanın bir çok yolu vardır. En popüler olanları şu şekilde listeleyebiliriz:

Hata oluşturma yolları:

- **Voltaj Bozma (Voltage Glitching):** Mikrosaniyelik bir süre içerisinde işlemcinin voltaj kaynak hattında dalgalanma oluşturarak işlemci içerisinde hata oluşması sağlanır.

- **Saat Sinyali Bozma (Clock Glitching):** İşlemcinin ana saat sinyal kaynağına dışarıdan etki ederek elektriksel sinyaller daha stabilize olmamış durumdayken işlemcinin işlem yapmaya çalışması sağlanır.

- **Elektromanyetik Hata Enjeksiyonu (Electromagnetic Fault Injection):** Elektromanyetik bir prob yardımıyla işlemciye yüksek voltajlı bir manyetik gürültü gönderilir ve bu şekilde işlemci içerisindeki register bitlerinin değişmesi sağlanır.

Hatalardan faydalanma yolları:

- **Komut Atlama (Instruction Skip):** Oluşan hata sonucunda işlemci üzerinde çalışan makine kodundaki spesifik komutların (örneğin gerekli güvenlik denetlemelerini yapan kod parçası) atlanması sağlanır.

- **Komut Bozulması (Instruction Corruption):** Oluşan hata sonucunda işlemci üzerinde çalışan makine kodundaki spesifik komutların başka komutlara çevirilmesi sağlanır.

- **Veri Bozulması (Data Corruption):** Oluşan hata sonucunda işlemci içerisindeki veya bellekteki verilerin bozulması (örneğin kod içerisinde False belirten bir 0 bitinin 1'e çevrilerek True belirtmesi) sağlanır.

## Gerçek Hayattan Örnekler: Konsol Mod Çipleri ve Rowhammer Saldırısı

Hata enjeksiyonu saldırısını teorik açıdan incelediğimize göre gerçek hayat örneklerine de bir göz atabiliriz:

- **Xbox 360 Reset Glitch Hack ve Mod Çipleri:** Hata enjeksiyonunun en popüler örneklerinden biri olan bu saldırı, Microsoft tarafından Xbox 360'a entegre edilen *güven zinciri (chain of trust)* modelini bozmak için geliştirilmiştir. Donanım hacker'ları, konsolun ana işlemcisinin saat sinyalini yavaşlatıp işlemcinin reset pinine (CPU_RESET) mikrosaniyelik bir pulse göndererek bir **voltaj/reset manipülasyonu** gerçekleştirmiş ve konsolun güven zincirini implement eden kod kısmını çalıştırmadan atlamasını sağlamıştır. Saldırı keşfedildikten sonra, bu saldırıyı gerçekleştiren harici donanımlar tasarlanmış ve **mod çipi** olarak insanların kullanması ve kendi Xbox 360'larına crack oyun indirebilmesi için piyasaya sürülmüştür. Hatta bu **voltaj bozma (voltage glitching)** mantığı konsol hack'leri için hala o kadar geçerli bir yöntemdir ki, günümüzde *Nintendo Switch* konsollarını kırmak için kullanılan modern mod çiplerinin de temel çalışma prensibini oluşturmaktadır.

![Xbox 360 içerisine lehimlenmiş bir mod çipi](/images/blog/fault-injection-tr/modchip.jpg)

- **Rowhammer Saldırısı:** Geleneksel hata enjeksiyonu saldırıları donanımsal süreçlere bağlı iken, Rowhammer saldırısı hata enjeksiyonunun *tamamen yazılımsal bir süreçle* de gerçekleştirilebileceğini kanıtlayan en önemli örneklerden biridir. Bu saldırıda spesifik bellek satırlarından (memory row) çok hızlı ve tekrarlı bir şekilde veri okuyan (hammering) bir program aracılığıyla *DRAM (Dynamic Random Access Memory)* içerisindeki kapasitörlerin üzerinde elektriksel yük geçişleri meydana gelmesi sağlanmış ve okunanlardan farklı bellek satırlarındaki veriler değiştirerek **veri bozulması (data corruption)** saldırısı gerçekleştirilmiştir. Araştırmacılar bu yöntemle, işletim sistemi belleğini manipüle ederek **yetki yükseltmesi (privilege escalation)** gibi kritik güvenlik açıkları meydana getirmişlerdir.

![Rowhammer saldırı diyagramı](/images/blog/fault-injection-tr/rowhammer.png)

## Sonuç

Sonuç olarak yazılımın çalıştığı donanım her ne kadar olabildiğince kararlı olsa da, *hiçbir donanım mükemmel değildir* ve farklı tekniklerle bozularak meydana gelen donanımsal hatalar üzerinden yazılımsal güvenlik açıkları oluşturulabilmektedir.
