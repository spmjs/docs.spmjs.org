exports.name = 'spm';
exports.version = '0.1';

exports.filters = {
  linkfix: function(html) {
    return html.replace(/(href="\..*?)\.md"/g, '$1"');
  },

  directory: function(posts, dir) {
    var ret = Object.keys(posts).map(function(key) {
      return posts[key];
    }).filter(function(item) {
      return item.meta.directory === dir;
    }).sort(function(a, b) {
      var aIndex = parseInt(a.meta.index || 100, 10);
      var bIndex = parseInt(b.meta.index || 100, 10);
      return aIndex - bIndex;
    });
    return ret;
  },

  category: function(posts, directory) {
    posts = Object.keys(posts).map(function(key) {
      return posts[key];
    }).filter(function(item) {
      return item.meta.directory === directory;
    });

    var categories = unique(posts.map(function(item) {
      return item.meta.category;
    })).map(function(categoryName) {
      var index = 0, cate = {
        title: categoryName
      };

      cate.posts = posts.filter(function(item) {
        return item.meta.category === categoryName;
      }).map(function(item) {
        index += parseInt(item.meta.index, 10);
        return item;
      }).sort(function(a, b) {
        var aIndex = parseInt(a.meta.index || 100, 10);
        var bIndex = parseInt(b.meta.index || 100, 10);
        return aIndex - bIndex;
      });
      
      cate.index = index;
      cate.length = cate.posts.length;
      return cate;
    }).map(function(item) {
      item.index = item.index / item.length;
      return item;
    }).sort(function(a, b) {
      return a.index - b.index;
    });

    return categories;
  }
};

function unique(arr) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    if (!arr[i] || ret.indexOf(arr[i]) > -1 ) {
      continue;
    }
    ret.push(arr[i]);
  }
  return ret;
}
