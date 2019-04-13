
const HOSTED_URLS = {
  model:
      'model_js/model.json',
  metadata:
      'model_js/metadata.json'
};

const examples = {
  'example1':
    'She had been forced into prudence in her youth   she learned romance as she grew older   the natural sequel of an unnatural beginning .With all these circumstances   recollections and feelings   she could not hear that Captain Wentworth   s sister was likely to live at Kellynch without a revival of former pain   and many a stroll   and many a sigh   were necessary to dispel the agitation of the idea .She often told herself it was folly   before she could harden her nerves sufficiently to feel the continual discussion of the Crofts and their business no evil .She was assisted   however   by that perfect indifference and apparent unconsciousness   among the only three of her own friends in the secret of the past   which seemed almost to deny any recollection of it .She could do justice to the superiority of Lady Russell   s motives in this   over those of her father and Elizabeth   she could honour all the better feelings of her calmness   but the general air of oblivion among them was highly important from whatever it sprung   and in the event of Admiral Croft   s really taking Kellynch Hall   she rejoiced anew over the conviction which had always been most grateful to her   of the past being known to those three only among her connexions   by whom no syllable   she believed   would ever be whispered   and in the trust that among his   the brother only with whom he had been residing   had received any information of their short   lived engagement .That brother had been long removed from the country and being a sensible man   and   moreover   a single man at the time   she had a fond dependence on no human creature   s having heard of it from him .The sister   Mrs Croft   had then been out of England   accompanying her husband on a foreign station   and her own sister   Mary   had been at school while it all occurred   and never admitted by the pride of some   and the delicacy of others   to the smallest knowledge of it afterwards .With these supports   she hoped that the acquaintance between herself and the Crofts   which   with Lady Russell   still resident in Kellynch   and Mary fixed only three miles off   must be anticipated   need not involve any particular awkwardness .On the morning appointed for Admiral and Mrs Croft   s seeing Kellynch Hall   Anne found it most natural to take her almost daily walk to Lady Russell   s   and keep out of the way till all was over   when she found it most natural to be sorry that she had missed the opportunity of seeing them .This meeting of the two parties proved highly satisfactory   and decided the whole business at once .',
  'example2':
    'For my part   I abominate all honourable respectable toils   trials   and tribulations of every kind whatsoever .It is quite as much as I can do to take care of myself   without taking care of ships   barques   brigs   schooners   and what not .And as for going as cook     though I confess there is considerable glory in that   a cook being a sort of officer on ship   board    yet   somehow   I never fancied broiling fowls     though once broiled   judiciously buttered   and judgmatically salted and peppered   there is no one who will speak more respectfully   not to say reverentially   of a broiled fowl than I will .It is out of the idolatrous dotings of the old Egyptians upon broiled ibis and roasted river horse   that you see the mummies of those creatures in their huge bake   houses the pyramids .No   when I go to sea   I go as a simple sailor   right before the mast   plumb down into the forecastle   aloft there to the royal mast   head .True   they rather order me about some   and make me jump from spar to spar   like a grasshopper in a May meadow .And at first   this sort of thing is unpleasant enough .It touches one   s sense of honour   particularly if you come of an old established family in the land   the Van Rensselaers   or Randolphs   or Hardicanutes .And more than all   if just previous to putting your hand into the tar   pot   you have been lording it as a country schoolmaster   making the tallest boys stand in awe of you .The transition is a keen one   I assure you   from a schoolmaster to a sailor   and requires a strong decoction of Seneca and the Stoics to enable you to grin and bear it .',
  'example3':
    'He went as near as his century permitted to walking the world literally like Don Juan   with rapier and guitar .For he never travelled without a case of swords   with which he had fought many brilliant duels   or without a corresponding case for his mandolin   with which he had actually serenaded Miss Ethel Harrogate   the highly conventional daughter of a Yorkshire banker on a holiday .Yet he was neither a charlatan nor a child   but a hot   logical Latin who liked a certain thing and was it .His poetry was as straightforward as anyone else   s prose .He desired fame or wine or the beauty of women with a torrid directness inconceivable among the cloudy ideals or cloudy compromises of the north   to vaguer races his intensity smelt of danger or even crime .Like fire or the sea   he was too simple to be trusted .The banker and his beautiful English daughter were staying at the hotel attached to Muscari   s restaurant   that was why it was his favourite restaurant .A glance flashed around the room told him at once   however   that the English party had not descended .The restaurant was glittering   but still comparatively empty .Two priests were talking at a table in a corner   but Muscari   an ardent Catholic   took no more notice of them than of a couple of crows .',
  'example4':
    'The Moon laughed at the sight   but when Little Jack Rollaround saw the Moon   he called out     Open the door   old Moon  I want to roll through the town   so that the people can see me   The Moon could not open the door   but he shone in through the keyhole   in a broad band .And Little Jack Rollaround sailed his trundle   bed boat up the beam   through the keyhole   and into the street .  Make a light   old Moon    he said     I want the people to see me   So the good Moon made a light and went along with him   and the little trundle   bed boat went sailing down the streets into the main street of the village .They rolled past the town hall and the schoolhouse and the church   but nobody saw little Jack Rollaround   because everybody was in bed   asleep .  Why don   t the people come to see me   High up on the church steeple   the Weather   vane answered     It is no time for people to be in the streets   decent folk are in their beds .   Then I   ll go to the woods   so that the animals may see me    said Little Jack .'
};

function status(statusText) {
  console.log(statusText);
  document.getElementById('status').textContent = statusText;
}

function showMetadata(metadataJSON) {
  document.getElementById('vocabularySize').textContent =
      metadataJSON['vocabulary_size'];
  document.getElementById('maxLen').textContent =
      metadataJSON['max_len'];
}

function settextField(text, predict) {
  const textField = document.getElementById('text-entry');
  textField.value = text;
  doPredict(predict);
}

function setPredictFunction(predict) {
  const textField = document.getElementById('text-entry');
  textField.addEventListener('input', () => doPredict(predict));
}

function disableLoadModelButtons() {
  document.getElementById('load-model').style.display = 'none';
}

function doPredict(predict) {
  const textField = document.getElementById('text-entry');
  const result = predict(textField.value);
  score_string = "Class scores: ";
  for (var x in result.score) {
    score_string += x + " ->  " + result.score[x].toFixed(3) + ", "
  }
  //console.log(score_string);
  status(
      score_string + ' elapsed: ' + result.elapsed.toFixed(3) + ' ms)');
}

function prepUI(predict) {
  setPredictFunction(predict);
  const testExampleSelect = document.getElementById('example-select');
  testExampleSelect.addEventListener('change', () => {
    settextField(examples[testExampleSelect.value], predict);
  });
  settextField(examples['example1'], predict);
}

async function urlExists(url) {
  status('Testing url ' + url);
  try {
    const response = await fetch(url, {method: 'HEAD'});
    return response.ok;
  } catch (err) {
    return false;
  }
}

async function loadHostedPretrainedModel(url) {
  status('Loading pretrained model from ' + url);
  try {
    const model = await tf.loadLayersModel(url);
    status('Done loading pretrained model.');
    disableLoadModelButtons();
    return model;
  } catch (err) {
    console.error(err);
    status('Loading pretrained model failed.');
  }
}

async function loadHostedMetadata(url) {
  status('Loading metadata from ' + url);
  try {
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    status('Done loading metadata.');
    return metadata;
  } catch (err) {
    console.error(err);
    status('Loading metadata failed.');
  }
}

class Classifier {

  async init(urls) {
    this.urls = urls;
    this.model = await loadHostedPretrainedModel(urls.model);
    await this.loadMetadata();
    return this;
  }

  async loadMetadata() {
    const metadata =
        await loadHostedMetadata(this.urls.metadata);
    showMetadata(metadata);
    this.maxLen = metadata['max_len'];
    console.log('maxLen = ' + this.maxLen);
    this.wordIndex = metadata['word_index']
  }

  predict(text) {
    // Convert to lower case and remove all punctuations.
    const inputText =
        text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Look up word indices.
    const inputBuffer = tf.buffer([1, this.maxLen], 'float32');
    for (let i = 0; i < inputText.length; ++i) {
      const word = inputText[i];
      inputBuffer.set(this.wordIndex[word], 0, i);
      //console.log(word, this.wordIndex[word], inputBuffer);
    }
    const input = inputBuffer.toTensor();
    //console.log(input);

    status('Running inference');
    const beginMs = performance.now();
    const predictOut = this.model.predict(input);
    //console.log(predictOut.dataSync());
    const score = predictOut.dataSync();//[0];
    predictOut.dispose();
    const endMs = performance.now();

    return {score: score, elapsed: (endMs - beginMs)};
  }
};

async function setup() {
  if (await urlExists(HOSTED_URLS.model)) {
    status('Model available: ' + HOSTED_URLS.model);
    const button = document.getElementById('load-model');
    button.addEventListener('click', async () => {
      const predictor = await new Classifier().init(HOSTED_URLS);
      prepUI(x => predictor.predict(x));
    });
    button.style.display = 'inline-block';
  }

  status('Standing by.');
}

setup();
