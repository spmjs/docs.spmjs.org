clean:
	@rm -fr _site

theme = _theme
site:
	@nico build --theme ${theme}

server:
	@nico server --theme ${theme} --watch

publish: clean site
	@ghp-import _site -p

.PHONY: clean site server publish
