# cppTypeParser
Parser for types of variables in C++ programming language.

The web page is deployed [here](https://crimestop.github.io/cppTypeParser/).

If you have any idea about this project, please [contact us](mailto:wangchao1@iai.ustc.edu.cn).

## Usage

Please input the C++ type and click the "parse the type" button.

The parsed type is shown below and the hidden block can be clicked to expand and hide.

## Grammar
```
type = name |
       name<type,type,...,type>

name contains no "<", "," and ">"
```
