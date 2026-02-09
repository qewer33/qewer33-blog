---
title: Four Days of Software Defined Radio
description: A writeup on the things I learned at a four day software defined radio (SDR) learning camp
thumbnail: /images/blog/four-days-of-software-defined-radio/banner.jpg
tags: [ "radio", "SDR", "embedded" ]
created: 2026-2-7
--- 

I recently had the opportunity to attend a four day long learning camp on **software defined radio (SDR)** basics. I've wanted to get into RF for quite a while now but as someone who mainly does embedded digital electronics and studies Computer Engineering, I am *genuinely scared* of both RF and the analog side of electronics 😅. So when I saw that this course was open, I immediately applied as I realized this was my one chance to overcome my fears. And luckily, I got accepted! Enough of an intro though, let's get into what I learned during the course.

## RF & Signal Processing Basics

Tackling the basics felt like it was going to be the hardest part of the course but it was actually not as bad as I thought! Our instructor was a university lecturer but he had an engineering background with 20+ years of experience in communication systems. I realized at just the first day that his preferred teaching style was more *hands on engineering and application* than bland academic theory. That in itself made the base material way easier to understand. He also liked giving real life analogies for the theoretical things he was explaining which also helped quite a ton.

One of the things I kept hearing about signal analysis before this course was the infamous **FFT (Fast Fourier Transform)**. It always seemed like that one scary algorithm that does some magic and is used a lot but turns out what it does was actually really intuitive to understand! I just had to learn about the **time domain** versus the **frequency domain**. Usually, when we look at a signal and see it as a *sine wave*, we are looking at it from the *time domain*. Basically the bottom axis in the signal graph is time. The *frequency domain* on the other hand is where we look at the signal with the *frequency as the bottom axis* instead of time. What the Fourier transform basically does is that it takes the signal from its time domain representation and converts it to the frequency domain. If the signal consists of multiple sine wave components in different frequencies (such as a *square wave*), the FFT breaks down the signal into its frequency components.

![A look at a signal from time and frequency domains](/images/blog/four-days-of-software-defined-radio/fft_time_freq_domains.png)

Another important thing we learned about was **modulations**. I obviously knew what *FM radio* was before the course but I had also heard about *AM radio* as the precursor to FM, which became less used after FM became more prominent. I had no idea what exactly they were though. Turns out, they were basically like *information encodings but for analog radio signals*. A **message signal** (could be any type of analog signal, like sound) is modulated to a **carrier signal** which is usually a high frequency sine wave. Two very common modulations are **AM (Amplitude Modulation)** and **FM (Frequency Modulation)**. As can be guessed by their names, in AM the information (message signal) is encoded to the amplitude of the carrier and in FM, it's encoded to the frequency.

![A comparison of AM, FM and PM](/images/blog/four-days-of-software-defined-radio/modulations.png)

We did learn *a lot more* (spectral leakage, aliasing, Nyquist theorem, filters, decimation etc.) on RF and signal processing basics and we did some simulations to understand them better in GNU Radio (we'll see what that is later) but I won't bore you with all that, the fun part is up ahead!

## Software Defined Radio

So... what even is this *software defined radio*? One of my first reactions when I used to hear SDR was; does the existence of such a thing imply normal radio is *hardware defined*??? And well, yeah! Traditional radios in most cases are primarily driven by their hardware configuration. They're full of magic analog electronic components that are there for processing signals: amplifiers, comparators, antennas and a variety of analog ICs. Radio hardware is designed with these components in specific configurations to receive and transmit specific radio signals.

![A traditional radio hardware PCB with a bunch of analog components](/images/blog/four-days-of-software-defined-radio/radio_board.png)

What about software defined radio then? As you can guess, in SDRs case, most of the special hardware doing the work is replaced by *software running on a general purpose computer*. That's right, most of the signal processing in SDR is done by a *CPU* instead of a bunch of different analog components. This makes SDR *much more flexible* than traditional hardware radios.

But wait.. how does SDR process something *analog* (the RF signal) with something *digital* (the computer processor running software)?. There has to be some sort of *analog to digital conversion* going on here and that's exactly the case! The SDR hardware is basically an RF antenna circuit coupled with a very fast and powerful **ADC (Analog to Digital Converter)** for the receiver part and a **DAC (Digital to Analog Converter)** for the transmitter. The receiver ADC samples the signal at a fixed *sampling rate*, turning a continuous analog signal into a discrete digital array of numbers (specifically in the *IQ complex number format*) and the transmitter DAC turns those numbers back into an analog signal for transmission. There are a variety of SDR hardware available in the market, the most popular options for hobbyists being RTL-SDR and HackRF. We'll talk a bit more about RTL-SDR under the next title.

![Basic diagram of an SDR system](/images/blog/four-days-of-software-defined-radio/sdr_diagram.png)

## RTL-SDR

[RTL-SDR](https://www.rtl-sdr.com/) is one of the cheapest SDR hardware available (around 40-50$). It's also called *the poor man's SDR* for that very reason! It's definitely not the greatest SDR hardware ever and it's receiver only. But it's still used quite extensively by hobbyists and educators because it provides great performance at an unbeatable price point. 

Our teacher provided everyone with an RTL-SDR dongle during the course along with a **dipole antenna**. We connected the antenna to the dongle via the *SMA connector* and plugged the dongle into our laptops.

![The RTL-SDR dongle connected to my laptop](/images/blog/four-days-of-software-defined-radio/rtl_sdr.jpg)

## GNU Radio

[GNU Radio](https://www.gnuradio.org/) is a free and open source (FOSS) software development toolkit that provides signal processing blocks to implement software defined radios. It provides *blocks* that do specific signal processing tasks and you can create all kinds of radios by connecting them to each other in a *flowgraph*. GNU Radio itself is a C++ library of **DSP (digital signal processing)** functions along with the C++ block implementations and a Python interface API. It's frontend program **GNU Radio Companion** provides a GUI interface that basically allows you to create SDRs with a node editor like visual programming interface!

![A WBFM receiver flowgraph in GNU Radio](/images/blog/four-days-of-software-defined-radio/wbfm_gnu_radio.png)

We used GNU Radio quite a lot during the course, especially while learning the basics. It was really fun to use the simulation blocks (Signal Source, Audio Sink, Throttle, Qt GUI Sink etc.) to discover signal processing in an applied manner. We also used it to analyze and process the signals coming from the RTL-SDR. GNU Radio was awesome but it wasn't the only tool we used, let's now take a look at some of the other ones!

## SDR++ and Gqrx

[SDR++](https://www.sdrpp.org/) and [Gqrx](https://www.gqrx.dk/) are FOSS general purpose SDR software. They interface with the SDR hardware and 
allow you to view and tune to different frequency ranges and view the signals on the spectrogram (waterfall graph). They also allow you to easily demodulate a variety of modulations (like AM, FM, CW etc.) and listen to modulated signals. They are similar to GNU radio but they are more *general purpose* as they allow you to do a variety of common things quite easily but you can't do the complex visual programming style signal processing you can do on GNU Radio (but fun fact, Gqrx actually uses GNU Radio as it's backend!).

![Listening to an FM radio station at 104.6MHz with SDR++](/images/blog/four-days-of-software-defined-radio/fm_sdrpp.png)

Our instructor showed us how to use both SDR++ and Gqrx and told us we could use whichever one we liked more. I personally chose SDR++ as I liked its interface more, its spectrogram configuration also seemed to be a bit better compared to Gqrx. Gqrx was definitely better at decoding RDS info from FM signals though, SDR++ wasn't very good at that for some reason.

## Capture the Signal

Throughout the 4 day course, we did a couple of **Capture the Signal** exercises. they're like the *CTFs (Capture the Flag)* in cybersecurity but the flags here are signals! Our instructor starts transmitting signals in a specific band (he either tells the rough center frequency of the band directly or gives a range for us to search on) and our task is to find the flags hidden in those signals. The flag can be *anything a radio signal represents*; it could be a voice signal modulated as FM or AM, it could be CW modulated morse code, it could be hidden in the RDS info of a WBFM broadcast or it could be a signal which displays an image when viewed on the spectrogram. My personal favorite was the spectrogram stuff (the fact that you can transmit images with analog signals is INSANELY COOL) but all CTS exercises were super fun.

![An upside down cat as one of the CTS flags 😺](/images/blog/four-days-of-software-defined-radio/flag_cat.png)

Our instructor also had us solve the same CTSs using both a general purpose SDR software (SDR++ or Gqrx) and using GNU Radio. We had to create our own simple flowgraphs in GNU Radio to listen to the signals, it was also fun doing it in two different ways.

## ADS-B & Digital Communication

On the last day of the course, we got a brief look into digital radio communication. Our instructor was pretty clear on how modern digital communication systems were extremely complex (think of *WiFi, Bluetooth and 5G*) and it probably wouldn't even fit into a whole semester lecture but he wanted us to briefly discover them as they're incredibly important for modern systems. We learned about some of the differences between analog modulations and digital modulations. We also learned about **ADS-B**, the digital radio broadcast system used by planes to transmit information about their flight status. We then used the [SDRAngel](https://www.sdrangel.org/) software to view the ADS-B data broadcast from planes flying overhead us via our RTL-SDRs. It was super cool to see the data they were broadcasting and see them on the map!

![Viewing the ADS-B data broadcast from overhead planes on SDRAngel](/images/blog/four-days-of-software-defined-radio/adsb_sdrangel.png)

While learning digital communication, we also briefly learned the **Quadrature Amplitude Modulation (QAM)** method used on a lot of modern digital radio communication systems (**WiFi and 5G** are two of the most prominent examples). It had a super interesting theory behind it but to be honest, I didn't really understand it all that much 😅. That's to be expected though as I mentioned before, digital radio communication systems could take up a whole semester lecture and QAM is one of the most important methods for sending digital signals over radio. We did take a look on a simulated QAM-4 transmitter and receiver on GNU Radio though, it was really interesting!

![QAM-4 receiver and transmitter simulation on GNU Radio](/images/blog/four-days-of-software-defined-radio/gnu_radio_qam.png)

## Conclusion

Overall, the entire course was packed with information and everything was easy to follow and fun to learn! I wish it was more than 4 days because each day was genuinely exciting with all the new stuff I learned. I can't wait to get my own amateur radio license along with an RTL-SDR and experiment with what I've learned (I want to integrate RF and SDR to some of my embedded projects now 👀) and learn even more!
