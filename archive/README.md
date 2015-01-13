### archive

archive contains a compressor and decompressor that converts directories
into .tar.gz files and vice-versa. It makes little effort to recover from 
errors or to provide any sort of extra functionality. 

#### usage

To compress a directory into a .tar.gz file:

`node compress.js directory name`

To extract a directory from a .tar.gz file:

`node decompress.js file.tar.gz name`