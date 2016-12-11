# ng-exif-js

## Required software ##
 * Git
 * NodeJS

## Setup ##
Execute setup.bat script to install package managers and dependencies.

    $ setup.bat

## Server ##
Execute server.bat script to start the web server.

    $ server.bat


## Metadata Structure in JPEG ##
A JPEG file contains several segments; each segment contains different kinds of data, delimited by two-byte codes called markers. The markers are hexadecimal; they begin with 0xFF and end with a code (1 byte) indicating the kind of marker.

Some markers consist of just those two bytes; others are followed by two bytes indicating the length of marker-specific payload data that follows. The length includes the two bytes for the length, but not the two bytes for the marker.

|Short name	|Bytes	|Payload	|Name and Comments|
|-----------|-------|-----------|-----------------|
|SOI	|0xFF, 0xD8	|None	|Start Of Image|
|SOF0	|0xFF, 0xC0	|Variable size	|Start Of Frame (Baseline DCT) Indicates that this is a baseline DCT-based JPEG, and specifies the width, height, number of components, and component subsampling|
|SOF2	|0xFF, 0xC2	|Variable size	|Start Of Frame (Progressive DCT) Indicates that this is a progressive DCT-based JPEG, and specifies the width, height, number of components, and component subsampling|
|DHT	|0xFF, 0xC4	|Variable size	|Define Huffman Table(s)|
|DQT	|0xFF, 0xDB	|Variable size	|Define Quantization Table(s)|
|DRI	|0xFF, 0xDD	|2 bytes	|Define Restart Interval Specifies the interval between RSTn markers, in macroblocks. This marker is followed by two bytes indicating the fixed size so it can be treated like any other variable size segment.|
|SOS	|0xFF, 0xDA	|Variable size	|Start Of Scan Begins a top-to-bottom scan of the image. In baseline DCT JPEG images, there is generally a single scan. Progressive DCT JPEG images usually contain multiple scans. This marker specifies which slice of data it will contain, and is immediately followed by entropy-coded data.|
|RSTn	|0xFF, 0xDn n(n=0..7)	|None	|Restart Inserted every r macroblocks, where r is the restart interval set by a DRI marker. Not used if there was no DRI marker. The low 3 bits of the marker code cycle in value from 0 to 7.|
|APPn	|0xFF, 0xEn	|Variable size	|Application-specific For example, an Exif JPEG file uses an APP1 marker to store metadata, laid out in a structure based closely on TIFF.|
|COM	|0xFF, 0xFE	|Variable size	|Comment|
|EOI	|0xFF, 0xD9	|None	|End Of Image|

The metadata in JPEG file is stored in APPn (0xFF, 0xEn) segment and the comment is stored in COM segment (0xFF, 0xFE). Several vendors might use the same APPn marker type to include their information, so these markers often begin with a vendor name (e.g., "Exif" or "Adobe") or some other identifying string.

Exiv2 provides fast and easy read write access to the Exif, IPTC and XMP. Hence, this article only focuses on the position of Exif, IPTC and XMP data in JPEG files.

## EXIF ##
Exif JPEG file uses an APP1 segment to store the information (and multiples APP2 segments for flashPix data). Exif APP1 segment stores a great amount of information on photographic parameters for digital cameras and it is the preferred way to store thumbnail images nowadays. It can also host an additional section with GPS data. All details about Exif are available at [[http://www.exif.org/Exif2-2.PDF]]

In theory, Exif APP1 is recorded immediately after the SOI marker (the marker indicating the beginning of the file). However, this leads to the incompatibility between the Exif and JFIF standards because both of them specify that their particular application segment (APP0 for JFIF, APP1 for Exif) must be the first in the image file. In practice, most JPEG files contain a JFIF marker segment (APP0) that precedes the Exif APP1. This allows older readers to correctly handle the format JFIF segment, while newer readers also decode the following Exif segment, being less strict about requiring it to appear first. This way will not affect the image decoding for most decoders, but poorly designed JFIF or Exif parsers may not recognize the file properly.

Exif APP1 segment consists of the APP1 marker (0xFFE1), Exif identifier string (“Exif\0\0”), and the attribute information itself. The identifier string "Exif\0\0” is used to avoid a conflict with other applications using APP1 (e.g XMP).

Exif does not use APPn segments other than APP1, APP2 and COM segments. However, some unknown APPn may still exist on the file structure and Exif readers should be designed to skip over them.

# Architecture #

## GUI / User Interface feature ##
User interface features
 * Angular directive
  * Show upload button
  * Show progress bar button
  * Show uploaded image
  * Display EXIF information
   * Exif/IPTC/GPS data


## Tools ##
Language and Frameworks used
 * Language
  * JavaScript
 * Framework
  * Angular
  * Node.js
 * Development tool
  * Browser-sync
  * Gulp


## Architecture ##
Top down structure.

![picture alt](https://github.com/CSUNCOMP467F2016/ng-exif-js/blob/master/docs/architecture.png)


## Performance Requirements ##
Reduce the number of watchers in Angular using Batarang. Watcher count over 2000 will slow the browser rendering.


## Error Handling ##
 * Use Angular log service and JavaScript try-catch block
 * Display log error message to console


## Scope of Proof of Concept ##
Present a simple web interface to upload an image and read EXIF data of image.

Setup web interface, server, and exif tool.

Include:
 * Angular directive
 * Image validation
 * Read EXIF
 * Print EXIF data


## Scope of MVP ##
By end of semester the project shall include a write feature.

**Include:**
 * Angular directive
 * Read EXIF
 * Print EXIF
 * Logging
 * Info & Error handling


## Use Case ##
 * User visits web page
  * Display upload image button
  * Display users uploaded image
 * User uploads image
  * Display image
  * Display Exif/IPTC data


## Milestones ##

|Week	|Description|
|-------|-----------|
|10/6	|Research|
|10/13	|Architecture|
|10/20	|Angular upload file directive|
|10/27	|EXIF tags & read|
|11/3	|Presentation|
|11/10	|Angular directive|
|11/17	|EXIF read|
|11/24	|EXIF read|
|12/1	|Complete EXIF read|
|12/8	|Presentation|

