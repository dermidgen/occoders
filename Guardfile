ignore %r{src/www/_site/*}

guard :shell do
  watch(%r{src/server/*}) { `killall node; cd test && node occoders.js >> /var/log/occoders.log &` }
  watch(%r{test/occoders\.js}) { `killall node; cd test && node occoders.js >> /var/log/occoders.log &` }
  watch(%r{src/www/*}) { |m| `cd src/www && jekyll --no-server` }
  callback(:start_begin) { `killall jekyll; cd src/www && jekyll --server >> /var/log/occoders.log &` }
  callback(:start_begin) { `killall node; cd test && node occoders.js >> /var/log/occoders.log &` }
  callback(:stop) { `killall jekyll; killall node` }
end

guard 'livereload', :apply_css_live => false, :apply_js_live => false do
  watch(%r{src/www/.+\.(css|html|js)})
end