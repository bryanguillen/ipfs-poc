# IPFS POC

**Note: As of 7/3, project is still a work in progress, thus, you will see "Coming Soon"
and incomplete code.**

## Motivation

### Overview

This mini-project's motivation is learning IPFS.  I believe IPFS and/or technologies
like it are the future of the web.

Thus, in order to get familiar with this technology, I created this POC to "test things
out".

Really, the things I want to test out are:

* Public File Uploads
* Private File Uploads
* DB

### Public File Uploads

The goal here is simple: Prove that the user can upload a simple image to IPFS 
and then view it.

### Private File Uploads

_Coming soon_

The goal here is similar to previous section, with a twist: Prove that the user can upload 
a "private" file to IPFS, where private means that only the user that uploaded the file 
can view said file.

### DB

_Coming soon_

The goal here is a little more involved.  It's to basically create a super simple DB like
data structure on IPFS, with the purpose of performing CRUD operations on the data stored.

For this POC, I'll be using messages as a simple way of modeling data and interacting
with said data on IPFS.

## Project Structure

_Coming Soon_

## App/How To Test

_Coming Soon_

### Browser Support

App has been tested on:
* Edge
* Firefox
* Chrome

As of this writing, it does not seem to be working on Firefox; it seems like some syntax 
issue with the `ipfs-http-client` package.  I will need to dig a bit deeper to understand 
what is going on.