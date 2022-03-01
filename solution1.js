/* After reading it I assumed the answer wasn't a simple .sort(), so I went Googling and I found
that sorting networks are the most efficient for this problem.

I found a sorting network for 10 inputs and then I just slammed some dummy comparators at the end to figure out where to put the 11th.
I also found a paper with a 11-step sorting network for 18 inputs, which I can reuse to this problem:
https://www-s3-live.kent.edu/s3fs-root/s3fs-public/TR-KSU-CS-2007-06.pdf

I also compared the solution attached to a simple .sort on jsbench.me and 
the sorting network was 91.41% faster scoring 16,325,656 runs / second */
function sortNet11(data) {    
    var swap;
    if (data[0] > data[5]) { swap = data[0]; data[0] = data[5]; data[5] = swap; }
    if (data[1] > data[6]) { swap = data[1]; data[1] = data[6]; data[6] = swap; }
    if (data[2] > data[7]) { swap = data[2]; data[2] = data[7]; data[7] = swap; }
    if (data[3] > data[8]) { swap = data[3]; data[3] = data[8]; data[8] = swap; }
    if (data[4] > data[9]) { swap = data[4]; data[4] = data[9]; data[9] = swap; }
    if (data[0] > data[3]) { swap = data[0]; data[0] = data[3]; data[3] = swap; }
    if (data[5] > data[8]) { swap = data[5]; data[5] = data[8]; data[8] = swap; }
    if (data[1] > data[4]) { swap = data[1]; data[1] = data[4]; data[4] = swap; }
    if (data[6] > data[9]) { swap = data[6]; data[6] = data[9]; data[9] = swap; }
    if (data[0] > data[2]) { swap = data[0]; data[0] = data[2]; data[2] = swap; }
    if (data[3] > data[6]) { swap = data[3]; data[3] = data[6]; data[6] = swap; }
    if (data[7] > data[9]) { swap = data[7]; data[7] = data[9]; data[9] = swap; }
    if (data[0] > data[1]) { swap = data[0]; data[0] = data[1]; data[1] = swap; }
    if (data[2] > data[4]) { swap = data[2]; data[2] = data[4]; data[4] = swap; }
    if (data[5] > data[7]) { swap = data[5]; data[5] = data[7]; data[7] = swap; }
    if (data[8] > data[9]) { swap = data[8]; data[8] = data[9]; data[9] = swap; }
    if (data[1] > data[2]) { swap = data[1]; data[1] = data[2]; data[2] = swap; }
    if (data[3] > data[5]) { swap = data[3]; data[3] = data[5]; data[5] = swap; }
    if (data[4] > data[6]) { swap = data[4]; data[4] = data[6]; data[6] = swap; }
    if (data[7] > data[8]) { swap = data[7]; data[7] = data[8]; data[8] = swap; }
    if (data[1] > data[3]) { swap = data[1]; data[1] = data[3]; data[3] = swap; }
    if (data[4] > data[7]) { swap = data[4]; data[4] = data[7]; data[7] = swap; }
    if (data[2] > data[5]) { swap = data[2]; data[2] = data[5]; data[5] = swap; }
    if (data[6] > data[8]) { swap = data[6]; data[6] = data[8]; data[8] = swap; }
    if (data[2] > data[3]) { swap = data[2]; data[2] = data[3]; data[3] = swap; }
    if (data[4] > data[5]) { swap = data[4]; data[4] = data[5]; data[5] = swap; }
    if (data[6] > data[7]) { swap = data[6]; data[6] = data[7]; data[7] = swap; }
    if (data[3] > data[4]) { swap = data[3]; data[3] = data[4]; data[4] = swap; }
    if (data[5] > data[6]) { swap = data[5]; data[5] = data[6]; data[6] = swap; }
    
    if(data[10] > data[0]) { swap = data[0]; data[0] = data[10]; data[10] = swap;}
    if(data[10] > data[1]) { swap = data[1]; data[1] = data[10]; data[10] = swap;}
    if(data[10] > data[2]) { swap = data[2]; data[2] = data[10]; data[10] = swap;}
    if(data[10] > data[3]) { swap = data[3]; data[3] = data[10]; data[10] = swap;}
    if(data[10] > data[4]) { swap = data[4]; data[4] = data[10]; data[10] = swap;}
    if(data[10] > data[5]) { swap = data[5]; data[5] = data[10]; data[10] = swap;}
    if(data[10] > data[6]) { swap = data[6]; data[6] = data[10]; data[10] = swap;}
    if(data[10] > data[7]) { swap = data[7]; data[7] = data[10]; data[10] = swap;}
    if(data[10] > data[8]) { swap = data[8]; data[8] = data[10]; data[10] = swap;}
    if(data[10] > data[9]) { swap = data[9]; data[9] = data[10]; data[10] = swap;}
    return(data);
}

sortNet11([6,50,21,40,1,23,65,96,39,40, 71, 23])