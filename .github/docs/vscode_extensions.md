# VSCode Extensions

There are several extensions that could help you develop this application when using Visual Studio Code. You may wanna check this out:

## Extensions

| No  | Extension Name                           | Developer       |
| --- | ---------------------------------------- | --------------- |
| 1   | DotENV                                   | mikestead       |
| 2   | Git Blame                                | Wade Anderson   |
| *3* | *Git Graph*                              | *Mhutchie*      |
| 4   | Prettier Code Formatter                  | Prettier        |
| 5   | YAML                                     | Red Hat         |
| 6   | Auto Rename Tag                          | Jun Han         |
| 7   | ESLint                                   | Microsoft       |
| *8* | *ES7+ React/Redux/React-Native snippets* | *dsznajder*     |
| 9   | Tailwind CSS Intellisense                | Tailwind Labs   |
| 10  | CSS Modules                              | clinyong        |
| 11  | *Headwind*                               | *Ryan Heybourn* |

### Additional Extension settings

For Tailwind CSS Intellisense, you might want to add this to your vscode settings.json file to enable intellisense outside classes. Basically this enables you to turn on the intellisense on syntax like `<Button buttonClasses=""/>`, `.classList('here')`, `const anyClasses = "here"`, or even if you defining `cntl` or `const styles = {classes : 'here'}`.

```json
"tailwindCSS.experimental.classRegex": 
[
	"classList\\.\\w*\\(['\"`](.*)['\"`]\\)",
	"\\wClasses\\s*?=\\s*?[`\"'](.*)['\"`]",
	".className\\s*?=\\s*?[`\"'](.*)[\"'`]",
	"\\wClassName\\s*?=\\s*?[`\"'](.*)[\"'`]",
	"cntl`([^`]*?)(?=cntl`|`)",
	[
		"const styles\\s*=\\s*{([\\s\\S]*)}",
		":\\s?\\n?[\\s]*?['\"`]([^'\"`]*)['\"`]"
	]
]
```

For Headwind extensions you may want to also want to add this setting:

```json
"headwind.classRegex": 
{
	"javascript": "(?:cntl`([^`${}]*?)([_a-zA-Z0-9\\s\\-\\:/[\\(,\\).\\[\\]#]+))|(?:\\bclassName\\s*=\\s*[\\\"\\']([_a-zA-Z0-9\\s\\-\\:\\/]+)[\\\"\\'])|(?:\\btw\\s*`([_a-zA-Z0-9\\s\\-\\:\\/]*)`)",
	"typescript": "(?:cntl`([^`${}]*?)([_a-zA-Z0-9\\s\\-\\:/[\\(,\\).\\[\\]#]+))|(?:\\bclassName\\s*=\\s*[\\\"\\']([_a-zA-Z0-9\\s\\-\\:\\/]+)[\\\"\\'])|(?:\\btw\\s*`([_a-zA-Z0-9\\s\\-\\:\\/]*)`)",
	"javascriptreact": "(?:\\b(?:class(?:Name)?|tw)\\s*=\\s*(?:(?:{[\"'`]([\\w\\d\\s!?_\\-:/()[\\]\"'`,]+)[\"'`]})|[\"'`]([\\w\\d\\s_\\-:/]+)[\"'`]))|(?:cntl`([^`${}]*?)([_a-zA-Z0-9\\s\\-\\:/[\\(,\\).\\[\\]#]+))",
	"typescriptreact": "(?:\\b(?:class(?:Name)?|tw)\\s*=\\s*(?:(?:{[\"'`]([\\w\\d\\s!?_\\-:/()[\\]\"'`,]+)[\"'`]})|[\"'`]([\\w\\d\\s_\\-:/]+)[\"'`]))|(?:cntl`([^`${}]*?)([_a-zA-Z0-9\\s\\-\\:/[\\(,\\).\\[\\]#]+))"
}
```