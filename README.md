
# Backwards Dynamic Slicer - Jalangi2

Proof of concept backward dynamic slicer written in Jalangi2, a framework for writing dynamic analyses for JavaScript.


## Getting Started

### Requirements
- Node 12.22.9

### Installation

```bash
  npm install
```

### Usage

```bash
  cd scripts
  node slice.js --inFile <inputFile> --outFile <outputFile> --lineNb <slicingCriterionLine>
```

### Test

```bash
  cd scripts
  node testRunner.js --source milestone2_testCases.json
  node testRunner.js --source milestone3_testCases.json
  node testRunner.js --source pm3_testCases.json
```
## Author

- [@beltranaceves](https://www.github.com/beltranaceves)

