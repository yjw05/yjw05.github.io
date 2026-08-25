(function () {
  'use strict';

  var yearNode = document.getElementById('updated-year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  Promise.all([
    fetch('/profile.json').then(checkResponse),
    fetch('/papers.json').then(checkResponse)
  ])
    .then(function (results) {
      renderProfile(results[0]);
      renderPaperList('preprints-list', results[1].preprints);
    })
    .catch(function () {
      // Keep the readable HTML fallback if data cannot be loaded.
    });

  function checkResponse(response) {
    if (!response.ok) throw new Error('Could not load site data');
    return response.json();
  }

  function renderProfile(profile) {
    setText('headline-en', profile.headlineEnglish);
    setText('headline-subtitle', profile.headlineSubtitle);

    if (profile.name) {
      document.title = profile.name + ' — Mathematics Homepage';
    }

    var list = document.getElementById('about-list');
    if (!list || !Array.isArray(profile.about)) return;

    list.replaceChildren();
    profile.about.forEach(function (item) {
      if (!item) return;
      var li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    if (profile.email) {
      var emailItem = document.createElement('li');
      emailItem.appendChild(document.createTextNode('Email me at '));
      var emailLink = document.createElement('a');
      emailLink.href = 'mailto:' + profile.email;
      emailLink.textContent = profile.email;
      emailItem.appendChild(emailLink);
      list.appendChild(emailItem);
    }
  }

  function renderPaperList(containerId, papers) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.replaceChildren();
    if (!Array.isArray(papers) || papers.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'No preprints listed yet.';
      container.appendChild(empty);
      return;
    }

    var list = document.createElement('ul');
    list.className = 'paper-list';

    papers.forEach(function (paper) {
      if (!paper || !paper.title) return;

      var item = document.createElement('li');
      appendText(item, 'paper-title', paper.title);
      appendText(item, 'paper-authors', paper.authors || '');

      var meta = document.createElement('span');
      meta.className = 'paper-meta';
      var details = [paper.venue, paper.year, paper.pages].filter(Boolean);
      if (details.length) meta.appendChild(document.createTextNode(details.join(' · ')));

      appendLink(meta, paper.pdf, 'Download PDF', details.length > 0);
      appendLink(meta, paper.url, 'External link', details.length > 0 || Boolean(paper.pdf));
      if (paper.note) {
        if (meta.childNodes.length) meta.appendChild(document.createTextNode(' · '));
        meta.appendChild(document.createTextNode(paper.note));
      }

      item.appendChild(meta);
      if (paper.abstract) {
        var abstractDetails = document.createElement('details');
        abstractDetails.className = 'paper-abstract-details';
        var abstractSummary = document.createElement('summary');
        abstractSummary.textContent = 'Abstract';
        var abstract = document.createElement('p');
        abstract.className = 'paper-abstract';
        abstract.textContent = paper.abstract;
        abstractDetails.appendChild(abstractSummary);
        abstractDetails.appendChild(abstract);
        item.appendChild(abstractDetails);
      }
      list.appendChild(item);
    });

    container.appendChild(list);
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node && value) node.textContent = value;
  }

  function appendText(parent, className, value) {
    var node = document.createElement('span');
    node.className = className;
    node.textContent = value;
    parent.appendChild(node);
  }

  function appendLink(parent, href, label, needsSeparator) {
    if (!href) return;
    if (needsSeparator) parent.appendChild(document.createTextNode(' · '));
    var link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (/^https?:\/\//.test(href)) {
      link.target = '_blank';
      link.rel = 'noreferrer';
    }
    parent.appendChild(link);
  }
})();
