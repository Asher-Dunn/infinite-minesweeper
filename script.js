const REGION_SIZE = 12;
const BASE_CELL_SIZE = 30;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3;
const CHORD_HOLD_MS = 520;
const WORLD_KEY = 'infinite-minesweeper-world-v2';
const STANDARD_NUMBERS = ['', '#78baff', '#80ddb2', '#ff8c87', '#baa1ff', '#ffbd69', '#67d9dd', '#f4f5f7', '#a6b0be'];
const THEME_DEFINITIONS = [
  ['midnight', 'Midnight', { bg:'#111827', map:'#121b28', hidden:'#405169', revealed:'#202c3d', cleared:'#203b3a', accent:'#93dfc5', line:'#324155', text:'#eff4fb', muted:'#91a0b5' }],
  ['classic', 'Classic', { bg:'#e7edf3', map:'#d7e0e9', hidden:'#b3bfcc', revealed:'#eef2f5', cleared:'#e1f0e5', accent:'#297f68', line:'#c7d0da', text:'#253448', muted:'#68788e', light:true, numbers:['','#1668bb','#228344','#d7413e','#583eae','#a56007','#177d84','#2b3440','#5e6872'] }],
  ['classic-dark', 'Classic Dark', { bg:'#202328', map:'#25292f', hidden:'#727a84', revealed:'#30353b', cleared:'#30423a', accent:'#e7b94d', line:'#515861', text:'#f1f3f5', muted:'#b0b7c0', numbers:['','#68a9ff','#68d391','#ff7777','#bb9cff','#f0c45d','#58d9d0','#f1f3f5','#b0b7c0'] }],
  ['black-white', 'Black & White', { bg:'#000000', map:'#000000', hidden:'#000000', revealed:'#ffffff', cleared:'#eeeeee', accent:'#ffffff', line:'#ffffff', text:'#ffffff', muted:'#d7d7d7', numbers:['','#000000','#111111','#222222','#333333','#444444','#555555','#000000','#666666'] }],
  ['forest', 'Forest', { bg:'#101d19', map:'#0e1c17', hidden:'#345549', revealed:'#1b3028', cleared:'#274533', accent:'#a5df8d', line:'#30483c', text:'#ecf4ec', muted:'#9aaf9e', numbers:['','#8fc7ff','#a5df8d','#ff9389','#c2a7ff','#f2c66d','#68d7d0','#eef4ee','#a8b9ad'] }],
  ['oled', 'OLED Black', { bg:'#000000', map:'#030609', hidden:'#161b22', revealed:'#080b10', cleared:'#0e1b17', accent:'#00e5ff', line:'#29323d', text:'#e8f7ff', muted:'#8094a5', glow:true, numbers:['','#00e5ff','#8cff00','#ff3b81','#bd79ff','#ffb000','#43f5dc','#f5fbff','#9fb4c4'] }],
  ['arcade-8bit', '8-bit Pixel', { bg:'#130c2d', map:'#1a1140', hidden:'#382571', revealed:'#211552', cleared:'#183b46', accent:'#ffdf4f', line:'#6544a0', text:'#fff5d4', muted:'#b8a8d8', numbers:['','#55e7ff','#73fa75','#ff5b71','#ff70e8','#ffd447','#66f0c5','#fff5d4','#c2b9db'] }],
  ['neon-vector', 'Neon Vector', { bg:'#10061d', map:'#14091f', hidden:'#28133d', revealed:'#1c0e2e', cleared:'#12333a', accent:'#00f6ff', line:'#633477', text:'#fff4ff', muted:'#bd9dcb', glow:true, numbers:['','#00eaff','#b1ff39','#ff477e','#bf70ff','#ffb323','#37f2c2','#fff4ff','#c3a9d6'] }],
  ['sunny-day', 'Sunny Day', { bg:'#76c8f5', map:'#9bddff', hidden:'#53a9e8', revealed:'#b8e7ff', cleared:'#d6efaa', accent:'#f4c928', line:'#438ebd', text:'#18374d', muted:'#426980', light:true, numbers:['','#1265ad','#347c38','#c83e36','#6842a8','#9a5d00','#087d76','#18374d','#526c7b'] }],
  ['high-contrast', 'High Contrast', { bg:'#080808', map:'#111111', hidden:'#2b2b2b', revealed:'#090909', cleared:'#171717', accent:'#ffe600', line:'#f2f2f2', text:'#ffffff', muted:'#dddddd', numbers:['','#00cfff','#7cff00','#ff4a4a','#d98bff','#ffe600','#00f0b5','#ffffff','#c9d2da'] }],
  ['ocean-deep', 'Ocean Deep', { bg:'#071d32', map:'#05233d', hidden:'#075579', revealed:'#092e49', cleared:'#103d43', accent:'#4de6e1', line:'#287394', text:'#e3f8ff', muted:'#91c5d8', numbers:['','#5ab9ff','#80e6b0','#ff8c9e','#be9dff','#ffd076','#4de6e1','#e3f8ff','#a6c5d0'] }],
  ['blueprint', 'Blueprint', { bg:'#073b6b', map:'#084a80', hidden:'#1674b5', revealed:'#0b3f70', cleared:'#0b5162', accent:'#8feaff', line:'#6ebce5', text:'#effaff', muted:'#b3d8ec', numbers:['','#8feaff','#9affba','#ffb4ac','#d6c4ff','#ffe48a','#78f4df','#effaff','#bed3e2'] }],
  ['volcanic', 'Volcanic', { bg:'#21100e', map:'#2a100d', hidden:'#6e3424', revealed:'#371714', cleared:'#27291b', accent:'#ff7b24', line:'#89442d', text:'#fff0d8', muted:'#c99b7d', numbers:['','#73bfff','#98df82','#ff6555','#d4a1ff','#ffb343','#61ded3','#fff0d8','#d0b5a0'] }],
  ['winter-frost', 'Winter Frost', { bg:'#d9ecf4', map:'#c3deea', hidden:'#8db4c6', revealed:'#eaf6fa', cleared:'#d9eedf', accent:'#468fb2', line:'#a7c8d6', text:'#193248', muted:'#617f8f', light:true, numbers:['','#2479ca','#36894e','#d94848','#7253b8','#a36720','#288b94','#193248','#667b87'] }],
  ['desert-dunes', 'Desert Dunes', { bg:'#f3e2bd', map:'#dfc18b', hidden:'#bd9760', revealed:'#f4e6c8', cleared:'#dce4b5', accent:'#b45d34', line:'#b99d70', text:'#44331e', muted:'#806e50', light:true, numbers:['','#3371a9','#557f37','#bd4438','#7554a4','#9b5b21','#317d75','#44331e','#77705e'] }],
  ['space-station', 'Space Station', { bg:'#090d18', map:'#0b1020', hidden:'#343e59', revealed:'#151b30', cleared:'#112c35', accent:'#6cf4f2', line:'#495979', text:'#ecf5ff', muted:'#9aaec4', numbers:['','#62b5ff','#7fe0a2','#ff7486','#c397ff','#ffc76a','#6cf4f2','#ecf5ff','#b1bdce'] }],
  ['jungle-canopy', 'Jungle Canopy', { bg:'#12281d', map:'#183a27', hidden:'#3c6842', revealed:'#203725', cleared:'#3d4b23', accent:'#b5df5b', line:'#547753', text:'#eff5d9', muted:'#a8bd8e', numbers:['','#80bdff','#b5df5b','#ff8070','#c99fff','#ffd16c','#5ee0bd','#eff5d9','#bdc9a6'] }],
  ['rainy-day', 'Rainy Day', { bg:'#25333b', map:'#2b3c46', hidden:'#627780', revealed:'#344750', cleared:'#354c48', accent:'#8bcbd0', line:'#526973', text:'#e7f1f3', muted:'#a5b8bd', numbers:['','#91c9ff','#83d5b0','#f18c91','#b7a2ed','#eccd8a','#74d2d1','#e7f1f3','#b7c4c6'] }],
  ['thunderstorm', 'Thunderstorm', { bg:'#1b1b1b', map:'#242424', hidden:'#555555', revealed:'#303030', cleared:'#46422c', accent:'#ffe14a', line:'#737373', text:'#f7f7f7', muted:'#bdbdbd', glow:true, numbers:['','#f0f0f0','#d8d8d8','#ffe14a','#ffea75','#a8a8a8','#fff2a6','#ffffff','#c7c7c7'] }],
  ['aurora', 'Aurora', { bg:'#101b2b', map:'#10253a', hidden:'#265365', revealed:'#172e42', cleared:'#1e4142', accent:'#76f2cf', line:'#376577', text:'#ebf6f7', muted:'#a5c3ca', glow:true, numbers:['','#79d8ff','#76f2cf','#ff9bd2','#b99cff','#f6d17b','#66e6dc','#ebf6f7','#a7c0cc'] }],
  ['lavender-dream', 'Lavender Dream', { bg:'#252033', map:'#302941', hidden:'#685e82', revealed:'#39334a', cleared:'#35463f', accent:'#d5b7ff', line:'#6b6085', text:'#f5efff', muted:'#c1b6d3', numbers:['','#7bc8ff','#91e0ad','#ff9b9e','#d5b7ff','#f3ce84','#70d9d0','#f5efff','#c5bdd0'] }],
  ['sunset-glow', 'Sunset Glow', { bg:'#301a27', map:'#482631', hidden:'#875044', revealed:'#492b37', cleared:'#374235', accent:'#ffb15e', line:'#88515a', text:'#fff1e6', muted:'#d9a99c', numbers:['','#7cbcff','#a6dc8a','#ff7b6d','#c5a2ff','#ffb15e','#69dbcf','#fff1e6','#d5c0b8'] }],
  ['tropical-reef', 'Tropical Reef', { bg:'#06343b', map:'#06444b', hidden:'#16818a', revealed:'#0b5158', cleared:'#1b5a48', accent:'#ff8c73', line:'#31828a', text:'#e9fffa', muted:'#9ed5cf', numbers:['','#58d9ff','#84f2bc','#ff8c73','#c7a2ff','#ffd06a','#48e8d1','#e9fffa','#acd5d2'] }],
  ['honeycomb', 'Honeycomb', { bg:'#30220b', map:'#38280c', hidden:'#80601c', revealed:'#49340e', cleared:'#3f4820', accent:'#ffd34f', line:'#8a6b2b', text:'#fff5d4', muted:'#d5bd80', numbers:['','#84bdff','#9bdf82','#ff8272','#c39cff','#ffd34f','#64ddd0','#fff5d4','#d5c69d'] }],
  ['haunted-moon', 'Haunted Moon', { bg:'#171725', map:'#1e1e32', hidden:'#4b4a69', revealed:'#27263d', cleared:'#27363b', accent:'#c3c9e8', line:'#62617f', text:'#f0f0ff', muted:'#b1b1ca', numbers:['','#83caff','#8ed8a3','#ff8e99','#c3a7ff','#eadb8c','#69d9d2','#f0f0ff','#c0bfd0'] }],
  ['solar-flare', 'Solar Flare', { bg:'#35130b', map:'#49180a', hidden:'#973813', revealed:'#57200e', cleared:'#3d3212', accent:'#ffcf24', line:'#a64e20', text:'#fff5df', muted:'#e1a686', glow:true, numbers:['','#69c8ff','#9bea76','#ff695e','#d397ff','#ffcf24','#54ebd5','#fff5df','#ddbca7'] }],
  ['rose-quartz', 'Rose Quartz', { bg:'#38232c', map:'#4a303a', hidden:'#9b6d7a', revealed:'#503742', cleared:'#3f4937', accent:'#f1b5c6', line:'#815866', text:'#fff1f3', muted:'#d0aab4', numbers:['','#d69bb2','#a9cf9a','#f27f86','#d1a1e5','#edc77c','#91d4c8','#fff1f3','#d0bdc2'] }],
  ['crimson-velvet', 'Crimson Velvet', { bg:'#260d17', map:'#330f1c', hidden:'#74283a', revealed:'#3d1521', cleared:'#343321', accent:'#ff637b', line:'#783346', text:'#fff0ee', muted:'#c8959b', numbers:['','#e3b276','#a9d48a','#ff637b','#d4a4f1','#f2c14e','#83d9c3','#fff0ee','#d7b8b7'] }],
  ['emerald-grove', 'Emerald Grove', { bg:'#0d2119', map:'#102c20', hidden:'#286044', revealed:'#183526', cleared:'#334528', accent:'#6fe0a1', line:'#3d7454', text:'#e8f8eb', muted:'#9cbea5', numbers:['','#d9bd70','#6fe0a1','#ff8980','#c59be5','#e9c569','#5dd7c1','#e8f8eb','#b7c8b5'] }],
  ['citrus-pop', 'Citrus Pop', { bg:'#28210b', map:'#35300b', hidden:'#767019', revealed:'#3b3511', cleared:'#35421b', accent:'#dfff35', line:'#898333', text:'#fffde1', muted:'#d1cb89', glow:true, numbers:['','#dfff35','#9bea65','#ff765e','#dd9dff','#ffd72f','#56e1b3','#fffde1','#d0ceaa'] }],
  ['coffeehouse', 'Coffeehouse', { bg:'#211711', map:'#302219', hidden:'#72543d', revealed:'#3c2c20', cleared:'#3b4029', accent:'#d7a86e', line:'#6c513c', text:'#f5e7d2', muted:'#bda88d', numbers:['','#c9a46c','#9ec27d','#e47e68','#bd9be0','#e0bd68','#74c5a4','#f5e7d2','#c8b9a4'] }],
  ['royal-plum', 'Royal Plum', { bg:'#211329', map:'#2d1839', hidden:'#664477', revealed:'#382246', cleared:'#2c3c34', accent:'#d38cff', line:'#704c83', text:'#f8edff', muted:'#c0a8cc', numbers:['','#d6ae70','#9bd28a','#ff8296','#d38cff','#f0c45f','#72d5c5','#f8edff','#cbb8d0'] }],
  ['snowy-forest', 'Snowy Forest', { bg:'#dce9eb', map:'#e5eff1', hidden:'#b8c5c5', revealed:'#fbfcfb', cleared:'#dce8d8', accent:'#68826b', line:'#aebfc0', text:'#2e3a3b', muted:'#718080', light:true, numbers:['','#527d91','#68826b','#b54b48','#7656a0','#a56d2c','#3a8277','#2e3a3b','#747d78'] }],
  ['sage-garden', 'Sage Garden', { bg:'#20251c', map:'#2c3428', hidden:'#687356', revealed:'#353c2e', cleared:'#465039', accent:'#b8cf85', line:'#667354', text:'#f0f2e4', muted:'#b2b99b', numbers:['','#cba969','#b8cf85','#dc8177','#ba9adc','#ecd177','#78c4a8','#f0f2e4','#c3c5b3'] }],
  ['obsidian-ember', 'Obsidian Ember', { bg:'#100d0c', map:'#17110e', hidden:'#493126', revealed:'#211714', cleared:'#272619', accent:'#ff9b45', line:'#584032', text:'#fff0df', muted:'#b7a394', glow:true, numbers:['','#eab760','#a9d17d','#ff705e','#c89ae7','#ff9b45','#5ed3bd','#fff0df','#c7b7a9'] }],
  ['deep-forest', 'Deep Forest', { bg:'#0a1711', map:'#0e2017', hidden:'#254633', revealed:'#15271c', cleared:'#303a1e', accent:'#9bc45a', line:'#36533d', text:'#edf4df', muted:'#9cae91', numbers:['','#c1b66a','#9bc45a','#eb786d','#b99ae0','#e4c36b','#63c7a4','#edf4df','#b3bca5'] }],
  ['halloween', 'Halloween', { bg:'#050505', map:'#0b0b0b', hidden:'#a84408', revealed:'#1b120c', cleared:'#26170c', accent:'#ff7a00', line:'#ed6a13', text:'#fff2df', muted:'#d1a57f', numbers:['','#ffd166','#ff9f43','#ff7a00','#f3b35c','#ffc34d','#e86616','#fff2df','#d4b99b'] }],
  ['ashen-steel', 'Ashen Steel', { bg:'#151719', map:'#1d2023', hidden:'#4a4f53', revealed:'#282b2e', cleared:'#30352f', accent:'#d4d8db', line:'#5b6166', text:'#f1f3f4', muted:'#aab0b4', numbers:['','#c4cbd0','#a7c58b','#f1857d','#c0a0dc','#dfc477','#75c8bc','#f1f3f4','#bcc2c6'] }],
  ['cherry-blossom', 'Cherry Blossom', { bg:'#f3dfe6', map:'#eed0db', hidden:'#c68da2', revealed:'#f9edf1', cleared:'#e0eedb', accent:'#c34d7d', line:'#d7a9bb', text:'#432936', muted:'#856777', light:true, numbers:['','#2875bb','#428248','#ce4850','#7759aa','#a96126','#297f7a','#432936','#786976'] }],
  ['monochrome', 'Minimal Monochrome', { bg:'#191919', map:'#111111', hidden:'#404040', revealed:'#222222', cleared:'#303030', accent:'#e6e6e6', line:'#777777', text:'#f5f5f5', muted:'#aaaaaa', numbers:['','#ffffff','#d8d8d8','#bcbcbc','#a4a4a4','#eeeeee','#cccccc','#f5f5f5','#8e8e8e'] }],
  ['autumn-ember', 'Autumn Ember', { bg:'#251610', map:'#301b13', hidden:'#75402b', revealed:'#47271c', cleared:'#34351e', accent:'#e9a33a', line:'#8a5033', text:'#fff0d9', muted:'#c5a17d', numbers:['','#83c5e8','#a8d37a','#f07759','#c79be3','#f2c65f','#61cabc','#fff0d9','#d9c4a5'] }],
  ['rosewood', 'Rosewood', { bg:'#2a1720', map:'#351d29', hidden:'#784656', revealed:'#452934', cleared:'#344033', accent:'#e69aae', line:'#845466', text:'#fff0f2', muted:'#c9a7b0', numbers:['','#9ec5e8','#a7d58c','#f07d83','#d59ae5','#f0c774','#72d1be','#fff0f2','#d5c1c5'] }],
  ['matcha', 'Matcha Garden', { bg:'#e5ead1', map:'#dce5c2', hidden:'#91a36c', revealed:'#f5f3dd', cleared:'#cfdcb2', accent:'#658447', line:'#9daa79', text:'#293522', muted:'#69775b', light:true, numbers:['','#487ab4','#527a40','#c54e43','#7857a1','#aa7029','#2d8177','#293522','#72796a'] }],
  ['terracotta', 'Terracotta', { bg:'#ead6c5', map:'#e1c5ad', hidden:'#b87555', revealed:'#f5e5d6', cleared:'#d8dfbd', accent:'#a94f35', line:'#bd8a6c', text:'#422b24', muted:'#806357', light:true, numbers:['','#3978aa','#668848','#c8493e','#7957a0','#a66b2b','#348078','#422b24','#77716b'] }],
  ['lime-circuit', 'Lime Circuit', { bg:'#10150b', map:'#151b0d', hidden:'#39471d', revealed:'#202815', cleared:'#2d3a18', accent:'#c2f542', line:'#596b2d', text:'#f4f8e8', muted:'#a8b68b', glow:true, numbers:['','#8bd8ff','#c2f542','#ff766a','#d392ff','#ffd15b','#51e1bb','#f4f8e8','#bdc8a5'] }],
  ['vintage-cream', 'Vintage Cream', { bg:'#efe5cb', map:'#e8dbbc', hidden:'#aa9368', revealed:'#f7efd9', cleared:'#dce2c5', accent:'#786343', line:'#b5a27c', text:'#393024', muted:'#776d5a', light:true, numbers:['','#477db2','#5d8047','#bb4c43','#76559c','#a36b2e','#337b72','#393024','#747064'] }],
  ['plum-eclipse', 'Plum Eclipse', { bg:'#17101e', map:'#20152a', hidden:'#50385f', revealed:'#2a1e35', cleared:'#26342b', accent:'#d49aff', line:'#604773', text:'#f6edff', muted:'#b6a5c4', glow:true, numbers:['','#8ccaff','#99da9a','#ff788b','#d49aff','#f0c66b','#63d4c5','#f6edff','#c6b5ce'] }],
  ['citrus-sorbet', 'Citrus Sorbet', { bg:'#fff0d8', map:'#f8e6c5', hidden:'#f2bd55', revealed:'#fff8e8', cleared:'#d9e6bb', accent:'#df7651', line:'#d7b777', text:'#453326', muted:'#88745b', light:true, numbers:['','#3975ab','#5e843f','#ce5145','#7959a0','#a76d29','#328078','#453326','#777165'] }],
  ['copper-canyon', 'Copper Canyon', { bg:'#211811', map:'#2d2016', hidden:'#765039', revealed:'#423022', cleared:'#343a22', accent:'#d98c52', line:'#835e42', text:'#f6ead9', muted:'#b9a188', numbers:['','#80b8d8','#9cce79','#f27b61','#c39add','#e8c568','#65cabe','#f6ead9','#d0bda7'] }],
  ['velvet-night', 'Velvet Night', { bg:'#1d1119', map:'#28151f', hidden:'#5b3044', revealed:'#341e2b', cleared:'#2d3929', accent:'#e886ad', line:'#714155', text:'#fff0f5', muted:'#c2a0ad', numbers:['','#91c5e9','#a5d68b','#f17680','#d493e8','#f0c674','#68d2c0','#fff0f5','#d3bcc5'] }],
  ['infrared', 'Infrared Scan', { bg:'#16090b', map:'#200d10', hidden:'#5c1d25', revealed:'#2c1216', cleared:'#39201b', accent:'#ff3d4e', line:'#762630', text:'#ffe9e8', muted:'#c99a9d', glow:true, numbers:['','#ff9b6b','#d8e86b','#ff4056','#e18bff','#ffc34d','#55e5ce','#ffe9e8','#d0b0ad'] }],
  ['olive-drab', 'Olive Drab', { bg:'#25251b', map:'#303022', hidden:'#77734b', revealed:'#43412e', cleared:'#4a4d32', accent:'#d3c87c', line:'#85805a', text:'#f1eed7', muted:'#b8b390', numbers:['','#99c2d8','#bad28a','#d87862','#c4a4da','#e3ca71','#76c7b4','#f1eed7','#c9c6ad'] }],
  ['neon-diner', 'Neon Diner', { bg:'#171116', map:'#211720', hidden:'#57313d', revealed:'#30212a', cleared:'#263b34', accent:'#ff526b', line:'#754552', text:'#fff1e7', muted:'#c5a8a8', glow:true, numbers:['','#54e3d1','#f0e9c1','#ff526b','#dc8cff','#ffba54','#65db9b','#fff1e7','#d4c4bd'] }],
  ['film-negative', 'Film Negative', { bg:'#111214', map:'#1b1c1e', hidden:'#34363a', revealed:'#252629', cleared:'#30372f', accent:'#f3ede0', line:'#55575a', text:'#f4f1e8', muted:'#a9a8a1', numbers:['','#f3ede0','#d7d2c3','#c7bca3','#aaa59a','#f1d9a2','#bab7ae','#f4f1e8','#85868a'] }],
  ['cinnabar-jade', 'Cinnabar & Jade', { bg:'#160c0b', map:'#21110f', hidden:'#64302a', revealed:'#321916', cleared:'#17392e', accent:'#4bcb91', line:'#874138', text:'#fff0df', muted:'#c09d84', numbers:['','#83c7df','#4bcb91','#ed5146','#d19ae4','#e9be5a','#52d8c5','#fff0df','#d0b8a2'] }],
  ['lemon-violet', 'Lemon & Violet', { bg:'#f0edb8', map:'#e8e3a3', hidden:'#b1aa59', revealed:'#fffbd1', cleared:'#d8e2bd', accent:'#6552a2', line:'#c1b96b', text:'#302b42', muted:'#77704e', light:true, numbers:['','#4e78a5','#5c803f','#c84f45','#6552a2','#ab6b2d','#328078','#302b42','#77716b'] }],
  ['poppy-field', 'Poppy Field', { bg:'#e7ead5', map:'#dce2c8', hidden:'#8e9b69', revealed:'#f7f4e5', cleared:'#d4e3c5', accent:'#d64037', line:'#a8b38a', text:'#333b2c', muted:'#727a66', light:true, numbers:['','#466da5','#628344','#d64037','#80549d','#a9662d','#358177','#333b2c','#73786d'] }],
  ['ink-bleach', 'Ink & Bleach', { bg:'#090a0d', map:'#101216', hidden:'#252930', revealed:'#f4f1e9', cleared:'#dadbd3', accent:'#ff735f', line:'#494d54', text:'#f4f1e9', muted:'#a8a9a8', numbers:['','#14171c','#282d34','#ff735f','#8d72b1','#d7a54d','#4f8d80','#f4f1e9','#8b8e91'] }],
  ['oxblood-mint', 'Oxblood & Mint', { bg:'#210d14', map:'#2d111b', hidden:'#702c3d', revealed:'#401b27', cleared:'#244235', accent:'#8be0b5', line:'#874053', text:'#ffedf0', muted:'#c6a0a8', numbers:['','#85c4e2','#8be0b5','#f16c79','#ce9ae1','#efc46b','#54d6c2','#ffedf0','#d2b9bf'] }],
  ['ultraviolet-concrete', 'Ultraviolet Concrete', { bg:'#242329', map:'#302e35', hidden:'#69646f', revealed:'#3e3b44', cleared:'#354037', accent:'#b79aff', line:'#77717f', text:'#f2eff7', muted:'#b5b0bc', numbers:['','#8bc7e8','#a8d589','#ed7d77','#b79aff','#e9c16b','#6acfc1','#f2eff7','#c6c2c8'] }],
  ['orchid-moss', 'Orchid & Moss', { bg:'#20211a', map:'#2a2c20', hidden:'#626543', revealed:'#37392b', cleared:'#3c472c', accent:'#d994cf', line:'#747657', text:'#f3f0dd', muted:'#b5b39a', numbers:['','#a4c8e3','#a6cf73','#e3786d','#d994cf','#e4c66b','#66cabb','#f3f0dd','#c9c7b2'] }],
  ['tangerine-teal', 'Tangerine & Teal', { bg:'#19201e', map:'#222b28', hidden:'#76543d', revealed:'#313b36', cleared:'#345044', accent:'#ff9b52', line:'#64766b', text:'#f8f1df', muted:'#b6b3a0', numbers:['','#79c8df','#9ed17c','#ff795e','#d294df','#ffbd58','#46c8b2','#f8f1df','#c9c8b8'] }],
  ['prism', 'Prism', { bg:'#141418', map:'#1c1c22', hidden:'#383840', revealed:'#292930', cleared:'#303a35', accent:'#ffffff', line:'#555560', text:'#f7f7fb', muted:'#aaaab8', numbers:['','#ff5f6d','#b6f36b','#54c9ff','#cc7bff','#ffd34e','#54ead1','#f7f7fb','#d1d1dd'] }],
  ['copper-noir', 'Copper Noir', { bg:'#111012', map:'#1b1718', hidden:'#5c3d32', revealed:'#302522', cleared:'#283b34', accent:'#d88a57', line:'#705044', text:'#f5e9dc', muted:'#b8a394', glow:true, numbers:['','#8cc7de','#a6d584','#ef7968','#d095df','#d88a57','#61d3bf','#f5e9dc','#cbbcaf'] }],
  ['pale-celadon', 'Pale Celadon', { bg:'#e4eee7', map:'#d7e6dc', hidden:'#8cae99', revealed:'#f5fbf6', cleared:'#d2e2cc', accent:'#4f8566', line:'#a2bdae', text:'#2b4135', muted:'#6e8778', light:true, numbers:['','#4775a6','#4f8566','#c64c46','#785a9a','#a06c30','#287a70','#2b4135','#708078'] }],
  ['neon-on-paper', 'Neon on Paper', { bg:'#f6f4eb', map:'#eae8de', hidden:'#2a2928', revealed:'#fffdf4', cleared:'#e4edcf', accent:'#ff20a0', line:'#c9c7bc', text:'#222326', muted:'#73726c', light:true, numbers:['','#ff20a0','#85c900','#ed3f32','#7a42cb','#ed8b00','#008c83','#222326','#777777'] }],
  ['hazard-graphite', 'Hazard Graphite', { bg:'#1b1c1e', map:'#242629', hidden:'#46494c', revealed:'#303337', cleared:'#3c3a26', accent:'#f5df00', line:'#696b6d', text:'#f7f6ee', muted:'#b9b8ae', numbers:['','#f5df00','#ff6b3d','#d0d1cb','#d88fff','#f3b94b','#55d6bf','#f7f6ee','#c3c4c1'] }],
  ['berry-lime', 'Berry & Lime', { bg:'#28101f', map:'#35142a', hidden:'#6b2851', revealed:'#421c36', cleared:'#314124', accent:'#c9f23b', line:'#854268', text:'#fff0f7', muted:'#c9a8bc', glow:true, numbers:['','#93d8eb','#c9f23b','#ff6b7c','#ed8be1','#f3c754','#59d7b8','#fff0f7','#d4bfd0'] }],
  ['desert-mirage', 'Desert Mirage', { bg:'#f2dba5', map:'#e9ca87', hidden:'#80603d', revealed:'#fff0c5', cleared:'#cbd49c', accent:'#7d285d', line:'#b5905b', text:'#3d2d24', muted:'#78634c', light:true, numbers:['','#4a718b','#5d7f3b','#ca4f3e','#7d285d','#986221','#297970','#3d2d24','#766d5b'] }],
  ['static-bloom', 'Static Bloom', { bg:'#141116', map:'#1e1921', hidden:'#3c3541', revealed:'#2b252f', cleared:'#253c31', accent:'#ff44c8', line:'#5d5263', text:'#f7f1f5', muted:'#b4a9b6', glow:true, numbers:['','#58e7dc','#b7f23d','#ff6d72','#ff44c8','#ffc04e','#70d58e','#f7f1f5','#c7bdc8'] }],
  ['frost-and-flame', 'Frost & Flame', { bg:'#e9e6df', map:'#dddad3', hidden:'#858786', revealed:'#fbf9f1', cleared:'#d8e1d7', accent:'#df5137', line:'#aaa9a4', text:'#343638', muted:'#777b7b', light:true, numbers:['','#526a7b','#597b55','#df5137','#79598f','#d39232','#338178','#343638','#74787a'] }],
  ['mangrove-night', 'Mangrove Night', { bg:'#0f1712', map:'#142019', hidden:'#344d38', revealed:'#1d2b21', cleared:'#304629', accent:'#e6a66d', line:'#4b674b', text:'#eff2df', muted:'#a8b29b', numbers:['','#83cde1','#abd56b','#e8786c','#d399d7','#e6a66d','#56d4b7','#eff2df','#c4c9af'] }],
  ['lagoon-sand', 'Lagoon Sand', { bg:'#e8dfc5', map:'#ddd1b1', hidden:'#9b8b68', revealed:'#f8f0d8', cleared:'#ced9ba', accent:'#287d70', line:'#b4a47f', text:'#35372e', muted:'#797765', light:true, numbers:['','#406e8e','#4e7a45','#bc5342','#785a96','#a66d32','#287d70','#35372e','#77766d'] }],
  ['opal-matrix', 'Opal Matrix', { bg:'#101418', map:'#171e20', hidden:'#304447', revealed:'#222b2c', cleared:'#283b31', accent:'#b5f0dd', line:'#4f6e6c', text:'#eef9f4', muted:'#a0b9b2', glow:true, numbers:['','#ffb0bd','#b5f0dd','#f8d36c','#c2a1ff','#f39c72','#71e4c5','#eef9f4','#c7d7d0'] }],
  ['candy-neon', 'Candy Neon', { bg:'#170e24', map:'#221431', hidden:'#593771', revealed:'#301d42', cleared:'#2c3d33', accent:'#ff5ca8', line:'#704b87', text:'#fff0f8', muted:'#c4a9cb', glow:true, numbers:['','#50e0e8','#b9f24a','#ff5ca8','#d686ff','#ffd05a','#62d9a7','#fff0f8','#cfbdd8'] }],
  ['rosewater-porcelain', 'Rosewater Porcelain', { bg:'#f4e8e4', map:'#ead9d4', hidden:'#b58b86', revealed:'#fff7f0', cleared:'#d8e2ce', accent:'#a5445b', line:'#c8a39a', text:'#3e3030', muted:'#796767', light:true, numbers:['','#3c75a0','#4e8157','#c24445','#75559e','#9b6429','#287d73','#3e3030','#77706c'] }],
  ['moss-and-lichen', 'Moss & Lichen', { bg:'#1c2417', map:'#252f1c', hidden:'#596847', revealed:'#303b25', cleared:'#465331', accent:'#d3d77a', line:'#68794e', text:'#f0f0d8', muted:'#b5ba91', numbers:['','#9ac9df','#c5da82','#f08a72','#c5a1dd','#edc66e','#65d1b0','#f0f0d8','#c6c5a9'] }],
  ['coral-lagoon', 'Coral Lagoon', { bg:'#f0e7d7', map:'#e4dac5', hidden:'#667d70', revealed:'#fff4dc', cleared:'#c9dfc9', accent:'#d34e46', line:'#9aac9c', text:'#283b38', muted:'#687e78', light:true, numbers:['','#3479a0','#3e825b','#d34e46','#7854a1','#a56a2c','#168b83','#283b38','#6b7975'] }],
  ['carbon-citrus', 'Carbon & Citrus', { bg:'#101210', map:'#171a17', hidden:'#3c403a', revealed:'#252925', cleared:'#30382b', accent:'#d7f23b', line:'#686d62', text:'#f4f5ed', muted:'#b5b8a9', glow:true, numbers:['','#83d7ff','#b6ec69','#ff766e','#d8a2ff','#ffd45a','#4ee0c3','#f4f5ed','#c8cabd'] }],
];
const THEMES = Object.fromEntries(THEME_DEFINITIONS.map(([id, label, colors]) => {
  const theme = { id, label, ...colors };
  theme.numbers ||= STANDARD_NUMBERS;
  theme.border = colors.border || colors.line;
  theme.blockedA = colors.blockedA || colors.hidden;
  theme.blockedB = colors.blockedB || colors.map;
  theme.gridHidden = colors.gridHidden || colors.line;
  theme.gridRevealed = colors.gridRevealed || colors.line;
  theme.overlay = `${colors.bg}cc`;
  theme.inactive = colors.inactive || colors.line;
  theme.ui = {
    '--bg': colors.bg, '--bg-glow': colors.map, '--text': colors.text, '--muted': colors.muted,
    '--accent': colors.accent, '--accent-text': colors.light ? colors.text : colors.accent,
    '--line': colors.line, '--toolbar': `${colors.bg}ee`, '--map': colors.map,
    '--control': colors.control || (colors.light ? colors.revealed : colors.hidden), '--control-border': colors.line, '--tip': `${colors.bg}f6`, '--tip-text': colors.text,
    '--dialog': colors.bg, '--overlay': theme.overlay,
  };
  theme.colorScheme = colors.light ? 'light' : 'dark';
  return [id, theme];
}));

const canvas = document.querySelector('#map');
const context = canvas.getContext('2d');
const mapWrap = document.querySelector('#map-wrap');
const statusElement = document.querySelector('#status');
const reachedElement = document.querySelector('#regions-reached');
const clearedElement = document.querySelector('#regions-cleared');
const coordinatesElement = document.querySelector('#coordinates');
const resetDialog = document.querySelector('#reset-dialog');
const soundButton = document.querySelector('#sound-toggle');
const controlModeButton = document.querySelector('#control-mode-toggle');
const keyButton = document.querySelector('#key-toggle');
const keyCountElement = document.querySelector('#key-count');
const themeToggle = document.querySelector('#theme-toggle');
const activeThemeName = document.querySelector('#active-theme-name');
const themeMenu = document.querySelector('#theme-menu');
const themePicker = document.querySelector('#theme-picker');
const zoomOutButton = document.querySelector('#zoom-out');
const zoomInButton = document.querySelector('#zoom-in');
const zoomLevel = document.querySelector('#zoom-level');

let world;
let regionCache = new Map();
const overviewCanvas = document.createElement('canvas');
const overviewContext = overviewCanvas.getContext('2d', { alpha: false });
let themeTransition = null;
let themeTransitionTimer = null;
let camera = { x: 0, y: 0 };
let zoom = 1;
let canvasWidth = 0;
let canvasHeight = 0;
let drag = null;
let chordTimer = null;
let chordFired = false;
let tipTimeout;
let effects = [];
let chargeState = null;
let drawFrame = null;
let saveTimeout = null;
let soundEnabled = true;
let keyMode = false;
let audioContext = null;
let masterGain = null;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function hash32(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  hash += hash << 13; hash ^= hash >>> 7; hash += hash << 3; hash ^= hash >>> 17; hash += hash << 5;
  return hash >>> 0;
}

function randomGenerator(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function floorDiv(value, divisor) { return Math.floor(value / divisor); }
function regionKey(rx, ry) { return `${rx},${ry}`; }
function parseRegionKey(key) { return key.split(',').map(Number); }
function cellRegion(x, y) { return { rx: floorDiv(x, REGION_SIZE), ry: floorDiv(y, REGION_SIZE) }; }
function localIndex(x, y, rx, ry) { return (y - ry * REGION_SIZE) * REGION_SIZE + (x - rx * REGION_SIZE); }
function regionForCell(x, y) { const { rx, ry } = cellRegion(x, y); return getRegion(rx, ry); }

function freshWorld() {
  return { seed: (Math.random() * 0xFFFFFFFF) >>> 0, firstClickDone: false, safeArea: [],
    regions: {}, keys: 0, camera: null, soundOn: true, controlMode: 'mouse', theme: 'midnight', stats: { reached: 0, cleared: 0 } };
}

function loadWorld() {
  try {
    const saved = JSON.parse(localStorage.getItem(WORLD_KEY));
    if (saved && Number.isInteger(saved.seed) && saved.stats && saved.regions) return saved;
  } catch (error) { /* Start a fresh world if saved data is unreadable. */ }
  return freshWorld();
}

function saveWorld() {
  world.camera = { ...camera };
  world.zoom = zoom;
  world.soundOn = soundEnabled;
  try { localStorage.setItem(WORLD_KEY, JSON.stringify(world)); }
  catch (error) { statusElement.textContent = 'Could not save world progress in this browser'; }
  updateStats();
}

function scheduleSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveWorld, 180);
}

function requestDraw() {
  if (drawFrame !== null) return;
  drawFrame = requestAnimationFrame(() => {
    drawFrame = null;
    draw();
    if (!reducedMotion && (effects.length || chargeState || themeTransition)) requestDraw();
  });
}

function updateStats() {
  reachedElement.textContent = world.stats.reached;
  clearedElement.textContent = world.stats.cleared;
  keyCountElement.textContent = world.keys || 0;
  keyButton.disabled = !(world.keys > 0);
  keyButton.classList.toggle('armed', keyMode);
  keyButton.setAttribute('aria-pressed', String(keyMode));
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = .52;
    masterGain.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, options = {}) {
  const audio = getAudioContext();
  if (!audio || !soundEnabled) return;
  const start = audio.currentTime + (options.delay || 0);
  const end = start + duration;
  const oscillator = audio.createOscillator();
  const envelope = audio.createGain();
  oscillator.type = options.wave || 'sine';
  oscillator.frequency.setValueAtTime(frequency, start);
  if (options.endFrequency) oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, end);
  envelope.gain.setValueAtTime(.0001, start);
  envelope.gain.exponentialRampToValueAtTime(options.volume || .11, start + .012);
  envelope.gain.exponentialRampToValueAtTime(.0001, end);
  oscillator.connect(envelope);
  envelope.connect(masterGain);
  oscillator.start(start);
  oscillator.stop(end + .015);
}

function playSound(name, detail = 0) {
  if (!soundEnabled) return;
  if (name === 'reveal') tone(detail ? 430 + detail * 48 : 340, .085, { volume: .055, wave: 'sine' });
  if (name === 'flag') tone(690, .1, { endFrequency: 920, volume: .07, wave: 'triangle' });
  if (name === 'unflag') tone(520, .1, { endFrequency: 350, volume: .055, wave: 'triangle' });
  if (name === 'chord') {
    tone(440, .12, { volume: .07, wave: 'triangle' });
    tone(660, .2, { delay: .08, volume: .065, wave: 'sine' });
  }
  if (name === 'failed-chord') {
    tone(255, .12, { endFrequency: 185, volume: .12, wave: 'triangle' });
    tone(215, .13, { delay: .09, endFrequency: 155, volume: .11, wave: 'triangle' });
  }
  if (name === 'clear') {
    tone(523, .22, { volume: .08 });
    tone(659, .24, { delay: .1, volume: .08 });
    tone(784, .36, { delay: .21, volume: .09 });
  }
  if (name === 'loss') tone(190, .55, { endFrequency: 58, volume: .12, wave: 'triangle' });
  if (name === 'reopen') {
    tone(392, .16, { volume: .07 });
    tone(587, .25, { delay: .1, volume: .08 });
  }
  if (name === 'key') {
    tone(880, .11, { volume: .08, wave: 'triangle' });
    tone(1175, .2, { delay: .08, volume: .09 });
  }
}

function updateSoundButton() {
  soundButton.textContent = soundEnabled ? '\u266A Sound on' : '\u266A Sound off';
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
  soundButton.setAttribute('aria-label', soundEnabled ? 'Mute sound effects' : 'Enable sound effects');
}

function updateControlModeButton() {
  const trackpad = world.controlMode === 'trackpad';
  controlModeButton.textContent = trackpad ? 'Trackpad controls' : 'Mouse controls';
  controlModeButton.setAttribute('aria-pressed', String(trackpad));
  controlModeButton.setAttribute('aria-label', `Switch to ${trackpad ? 'mouse' : 'trackpad'} controls`);
  controlModeButton.title = trackpad
    ? 'Trackpad: two-finger scroll pans; pinch zooms. Click to switch to mouse controls.'
    : 'Mouse: scroll wheel zooms; drag pans. Click to switch to trackpad controls.';
  canvas.setAttribute('aria-label', trackpad
    ? 'Infinite Minesweeper map. Click to reveal, right click to flag, drag or two-finger scroll to pan, pinch to zoom.'
    : 'Infinite Minesweeper map. Click to reveal, right click to flag, drag to pan, scroll wheel to zoom.');
}

function toggleControlMode() {
  world.controlMode = world.controlMode === 'trackpad' ? 'mouse' : 'trackpad';
  updateControlModeButton();
  statusElement.textContent = `${world.controlMode === 'trackpad' ? 'Trackpad' : 'Mouse'} controls enabled`;
  saveWorld();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundButton();
  saveWorld();
  if (soundEnabled) playSound('flag');
}

function updateThemeSelection() {
  themeMenu.querySelectorAll('.theme-option').forEach(option => {
    const selected = option.dataset.theme === 'random'
      ? Boolean(world.randomTheme)
      : !world.randomTheme && option.dataset.theme === world.theme;
    option.setAttribute('aria-selected', String(selected));
  });
}

function applyTheme(name, persist = true, preserveRandomMode = false, fade = false) {
  const selectedTheme = Object.hasOwn(THEMES, name) ? name : 'midnight';
  const theme = THEMES[selectedTheme];
  if (fade && !reducedMotion && canvas.width && canvas.height) {
    const previousFrame = document.createElement('canvas');
    previousFrame.width = canvas.width;
    previousFrame.height = canvas.height;
    previousFrame.getContext('2d').drawImage(canvas, 0, 0);
    themeTransition = { canvas: previousFrame, start: performance.now(), duration: 760 };
    document.documentElement.classList.add('theme-fade');
    clearTimeout(themeTransitionTimer);
    themeTransitionTimer = setTimeout(() => document.documentElement.classList.remove('theme-fade'), 820);
  }
  world.theme = selectedTheme;
  world.randomTheme = preserveRandomMode;
  document.documentElement.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = theme.colorScheme;
  for (const [property, value] of Object.entries(theme.ui)) document.documentElement.style.setProperty(property, value);
  activeThemeName.textContent = theme.label;
  themeToggle.setAttribute('aria-label', preserveRandomMode
    ? `Current theme: ${theme.label}. Changes randomly when a region clears. Choose theme.`
    : `Choose theme. Current theme: ${theme.label}.`);
  updateThemeSelection();
  draw();
  if (persist) saveWorld();
}

function buildThemeGallery() {
  const previewClasses = ['preview-cell','preview-cell','preview-cell open n1','preview-cell','preview-cell','preview-cell open n2','preview-cell accent','preview-cell','preview-cell open n3','preview-cell','preview-cell','preview-cell open n1','preview-cell','preview-cell accent','preview-cell open n2','preview-cell'];
  const randomOption = document.createElement('button');
  randomOption.type = 'button';
  randomOption.className = 'theme-option';
  randomOption.dataset.theme = 'random';
  randomOption.setAttribute('role', 'option');
  randomOption.setAttribute('aria-selected', 'false');
  const randomPreview = document.createElement('span');
  randomPreview.className = 'theme-preview random-theme-preview';
  randomPreview.setAttribute('aria-hidden', 'true');
  const randomLabel = document.createElement('span');
  randomLabel.className = 'theme-option-name';
  randomLabel.textContent = 'Random on clear';
  randomOption.append(randomPreview, randomLabel);
  randomOption.addEventListener('click', () => {
    applyTheme(world.theme, false, true);
    saveWorld();
    statusElement.textContent = 'Random theme will change when you clear a region';
    closeThemeMenu();
    themeToggle.focus();
  });
  themeMenu.append(randomOption);

  for (const theme of Object.values(THEMES)) {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'theme-option';
    option.dataset.theme = theme.id;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');

    const preview = document.createElement('span');
    preview.className = 'theme-preview';
    preview.setAttribute('aria-hidden', 'true');
    preview.style.setProperty('--preview-map', theme.map);
    preview.style.setProperty('--preview-hidden', theme.hidden);
    preview.style.setProperty('--preview-revealed', theme.revealed);
    preview.style.setProperty('--preview-line', theme.line);
    preview.style.setProperty('--preview-text', theme.text);
    preview.style.setProperty('--preview-accent', theme.accent);
    theme.numbers.slice(1, 4).forEach((color, index) => preview.style.setProperty(`--preview-n${index + 1}`, color));
    previewClasses.forEach((className, index) => {
      const tile = document.createElement('span');
      tile.className = className;
      if (className.includes('n1')) tile.textContent = '1';
      if (className.includes('n2')) tile.textContent = '2';
      if (className.includes('n3')) tile.textContent = '3';
      if (className.includes('accent')) tile.textContent = '\u2691';
      preview.append(tile);
    });

    const label = document.createElement('span');
    label.className = 'theme-option-name';
    label.textContent = theme.label;
    option.append(preview, label);
    option.addEventListener('click', () => {
      applyTheme(theme.id);
      closeThemeMenu();
      themeToggle.focus();
    });
    themeMenu.append(option);
  }
}

function openThemeMenu() {
  themeMenu.hidden = false;
  themeToggle.setAttribute('aria-expanded', 'true');
}

function closeThemeMenu() {
  themeMenu.hidden = true;
  themeToggle.setAttribute('aria-expanded', 'false');
}

function toggleThemeMenu() {
  if (themeMenu.hidden) openThemeMenu();
  else closeThemeMenu();
}

function regionState(rx, ry) {
  const key = regionKey(rx, ry);
  if (!world.regions[key]) world.regions[key] = { revealed: [], flagged: [], blocked: false, cleared: false, reached: false, keyFound: false };
  if (world.regions[key].keyFound === undefined) world.regions[key].keyFound = false;
  return world.regions[key];
}

function safeIndexesForRegion(rx, ry) {
  return world.safeArea
    .filter(([x, y]) => cellRegion(x, y).rx === rx && cellRegion(x, y).ry === ry)
    .map(([x, y]) => localIndex(x, y, rx, ry));
}

function getRegion(rx, ry) {
  const key = regionKey(rx, ry);
  if (regionCache.has(key)) return regionCache.get(key);
  const seed = hash32(`${world.seed}:${rx}:${ry}`);
  const random = randomGenerator(seed);
  const mineCount = 17 + Math.floor(random() * 12);
  const mines = new Uint8Array(REGION_SIZE * REGION_SIZE);
  const candidates = Array.from({ length: mines.length }, (_, index) => index);
  const safeIndexes = new Set(safeIndexesForRegion(rx, ry));
  const blockedIndexes = candidates.filter(index => !safeIndexes.has(index));
  for (let index = 0; index < mineCount; index++) {
    const chosen = index + Math.floor(random() * (blockedIndexes.length - index));
    [blockedIndexes[index], blockedIndexes[chosen]] = [blockedIndexes[chosen], blockedIndexes[index]];
    mines[blockedIndexes[index]] = 1;
  }
  const keyRandom = randomGenerator(hash32(`${world.seed}:${rx}:${ry}:key`));
  const safeForKey = candidates.filter(index => !mines[index]);
  const keyIndex = keyRandom() < .08 && safeForKey.length ? safeForKey[Math.floor(keyRandom() * safeForKey.length)] : -1;
  const region = { rx, ry, key, mines, keyIndex, state: regionState(rx, ry) };
  regionCache.set(key, region);
  return region;
}

function isMine(x, y) {
  const { rx, ry } = cellRegion(x, y);
  const region = getRegion(rx, ry);
  return region.mines[localIndex(x, y, rx, ry)] === 1;
}

function isBlocked(x, y) { return regionForCell(x, y).state.blocked; }
function isRevealed(x, y) { const r = regionForCell(x, y); return r.state.revealed.includes(localIndex(x, y, r.rx, r.ry)); }
function isFlagged(x, y) { const r = regionForCell(x, y); return r.state.flagged.includes(localIndex(x, y, r.rx, r.ry)); }

function setMembership(array, value, enabled) {
  const index = array.indexOf(value);
  if (enabled && index < 0) array.push(value);
  if (!enabled && index >= 0) array.splice(index, 1);
}

function requestEffectFrame() {
  requestDraw();
}

function addCellEffect(kind, x, y) {
  if (reducedMotion) return;
  effects.push({ kind, x, y, start: performance.now(), duration: kind === 'chord' ? 650 : 380 });
  requestEffectFrame();
}

function addRegionEffect(kind, rx, ry) {
  if (reducedMotion) return;
  const palette = kind === 'loss' ? ['#ff6f78', '#ffb778', '#d94f60', '#ff9b8d'] : ['#93dfc5', '#d7f29a', '#f4d57d', '#82c9f3'];
  const particles = Array.from({ length: 52 }, () => ({
    x: rx * REGION_SIZE + Math.random() * REGION_SIZE,
    y: ry * REGION_SIZE + Math.random() * REGION_SIZE,
    vx: (Math.random() - .5) * 7,
    vy: -2 - Math.random() * 8,
    size: 2 + Math.random() * 3,
    color: palette[Math.floor(Math.random() * palette.length)],
    spin: Math.random() * Math.PI,
  }));
  effects.push({ kind, rx, ry, start: performance.now(), duration: kind === 'loss' ? 1000 : 1350, particles });
  requestEffectFrame();
}

function neighbors(x, y) {
  const result = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (dx || dy) result.push([x + dx, y + dy]);
  }
  return result;
}

function countMines(x, y) { return neighbors(x, y).filter(([nx, ny]) => isMine(nx, ny)).length; }

function isCellPlayable(x, y, allowFirstReveal = false) {
  if (isBlocked(x, y)) return false;
  if (allowFirstReveal) return true;
  return neighbors(x, y).some(([nx, ny]) => isRevealed(nx, ny));
}

function collectKey(region, index) {
  if (index !== region.keyIndex || region.state.keyFound) return;
  region.state.keyFound = true;
  world.keys = (world.keys || 0) + 1;
  keyMode = false;
  playSound('key');
  statusElement.textContent = 'Reopen key found';
  updateStats();
  saveWorld();
}

function useKeyOnRegion(rx, ry) {
  const region = getRegion(rx, ry);
  if (!(world.keys > 0) || !region.state.blocked) {
    statusElement.textContent = 'Choose a blocked region to reopen';
    return;
  }
  world.keys--;
  region.state.blocked = false;
  region.state.cleared = false;
  delete region.state.lostAt;
  keyMode = false;
  playSound('reopen');
  statusElement.textContent = `Key used: region ${rx}, ${ry} reopened`;
  updateStats();
  saveWorld();
  draw();
}

function markReached(region) {
  if (!region.state.reached) {
    region.state.reached = true;
    world.stats.reached++;
  }
}

function prepareFirstClick(x, y) {
  const safeArea = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) safeArea.push([x + dx, y + dy]);
  world.safeArea = safeArea;
  regionCache.clear();
  world.firstClickDone = true;
}

function reveal(x, y, seen = new Set(), playAudio = true, allowFirstReveal = false) {
  const tag = `${x},${y}`;
  if (seen.has(tag)) return;
  seen.add(tag);
  const region = regionForCell(x, y);
  if (!isCellPlayable(x, y, allowFirstReveal) || isRevealed(x, y) || isFlagged(x, y)) return;
  markReached(region);
  if (isMine(x, y)) {
    if (region.state.cleared) {
      region.state.cleared = false;
      world.stats.cleared = Math.max(0, world.stats.cleared - 1);
    }
    const lostIndex = localIndex(x, y, region.rx, region.ry);
    for (let index = 0; index < region.mines.length; index++) {
      if (index === lostIndex) setMembership(region.state.flagged, index, true);
      else if (!region.mines[index]) setMembership(region.state.flagged, index, false);
    }
    region.state.blocked = true;
    region.state.lostAt = lostIndex;
    playSound('loss');
    addRegionEffect('loss', region.rx, region.ry);
    statusElement.textContent = `Region ${region.rx}, ${region.ry} is blocked. Secure its eight neighbors to reopen it.`;
    checkUnlocksAround(region.rx, region.ry);
    saveWorld();
    draw();
    return;
  }
  const index = localIndex(x, y, region.rx, region.ry);
  setMembership(region.state.revealed, index, true);
  collectKey(region, index);
  addCellEffect('reveal', x, y);
  const clue = countMines(x, y);
  if (playAudio) playSound('reveal', clue);
  if (clue === 0) for (const [nx, ny] of neighbors(x, y)) reveal(nx, ny, seen, false);
  updateRegionCompletion(region);
}

function flag(x, y) {
  const region = regionForCell(x, y);
  if (region.state.cleared) return;
  const alreadyFlagged = isFlagged(x, y);
  // Existing flags can be removed from blocked regions, but cleared regions are locked.
  if (!alreadyFlagged && (!isCellPlayable(x, y) || isRevealed(x, y))) return;
  markReached(region);
  const index = localIndex(x, y, region.rx, region.ry);
  const isNowFlagged = !alreadyFlagged;
  setMembership(region.state.flagged, index, isNowFlagged);
  playSound(isNowFlagged ? 'flag' : 'unflag');
  addCellEffect(isNowFlagged ? 'flag' : 'unflag', x, y);
  updateRegionCompletion(region);
  saveWorld();
  draw();
}

function updateRegionCompletion(region) {
  if (region.state.blocked || region.state.cleared) return;
  const allSafeRevealed = region.mines.every((mine, index) => mine || region.state.revealed.includes(index));
  const allMinesFlagged = region.mines.every((mine, index) => Boolean(mine) === region.state.flagged.includes(index));
  if (!allSafeRevealed && !allMinesFlagged) return;
  for (let index = 0; index < region.mines.length; index++) {
    if (region.mines[index]) setMembership(region.state.flagged, index, true);
  }
  if (allMinesFlagged) {
    for (let index = 0; index < region.mines.length; index++) {
      if (!region.mines[index]) {
        setMembership(region.state.revealed, index, true);
        setMembership(region.state.flagged, index, false);
        collectKey(region, index);
      }
    }
  }
  region.state.cleared = true;
  world.stats.cleared++;
  playSound('clear');
  addRegionEffect('clear', region.rx, region.ry);
  statusElement.textContent = `Region ${region.rx}, ${region.ry} cleared`;
  if (world.randomTheme) {
    const availableThemes = Object.keys(THEMES).filter(name => name !== world.theme);
    const nextTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    applyTheme(nextTheme, false, true, true);
  }
  checkUnlocksAround(region.rx, region.ry);
  saveWorld();
}

function checkUnlocksAround(rx, ry) {
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const target = getRegion(rx + dx, ry + dy);
    if (!target.state.blocked) continue;
    if (securedNeighborCount(target.rx, target.ry) === 8) {
      target.state.blocked = false;
      target.state.cleared = false;
      delete target.state.lostAt;
      world.stats.cleared = Math.max(0, world.stats.cleared);
      playSound('reopen');
      statusElement.textContent = `Region ${target.rx}, ${target.ry} reopened`;
    }
  }
}

function securedNeighborCount(rx, ry) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (dx === 0 && dy === 0) continue;
    const state = getRegion(rx + dx, ry + dy).state;
    if (state.blocked || state.cleared) count++;
  }
  return count;
}

function chord(x, y) {
  if (isBlocked(x, y) || !isRevealed(x, y)) return;
  const number = countMines(x, y);
  const nearby = neighbors(x, y);
  if (nearby.filter(([nx, ny]) => isFlagged(nx, ny)).length !== number) {
    playSound('failed-chord');
    statusElement.textContent = `This number needs ${number} adjacent flags to chord`;
    return;
  }
  playSound('chord');
  addCellEffect('chord', x, y);
  const seen = new Set();
  for (const [nx, ny] of nearby) if (!isFlagged(nx, ny) && !isRevealed(nx, ny)) reveal(nx, ny, seen, false);
  saveWorld();
  draw();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvasWidth = rect.width;
  canvasHeight = rect.height;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  draw();
}

function cellSize() { return BASE_CELL_SIZE * zoom; }

function updateZoomControls() {
  zoomLevel.value = `${Math.round(zoom * 100)}%`;
  zoomLevel.textContent = zoomLevel.value;
  zoomOutButton.disabled = zoom <= MIN_ZOOM;
  zoomInButton.disabled = zoom >= MAX_ZOOM;
}

function zoomAt(factor, pointerX = canvasWidth / 2, pointerY = canvasHeight / 2) {
  const oldSize = cellSize();
  const worldX = camera.x + pointerX / oldSize;
  const worldY = camera.y + pointerY / oldSize;
  const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * factor));
  if (nextZoom === zoom) return;
  zoom = nextZoom;
  const newSize = cellSize();
  camera.x = worldX - pointerX / newSize;
  camera.y = worldY - pointerY / newSize;
  updateZoomControls();
  requestDraw();
  scheduleSave();
}

function draw() {
  if (!canvasWidth || !canvasHeight || !world) return;
  const palette = THEMES[world.theme] || THEMES.midnight;
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = palette.map;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  const startX = Math.floor(camera.x);
  const startY = Math.floor(camera.y);
  const size = cellSize();
  const offsetX = -(camera.x - startX) * size;
  const offsetY = -(camera.y - startY) * size;
  const columns = Math.ceil(canvasWidth / size) + 1;
  const rows = Math.ceil(canvasHeight / size) + 1;

  // At the far zoom levels, render one colored pixel per cell. This avoids
  // thousands of tiny text, shadow, icon, and stroke operations per frame.
  if (size <= 9) {
    drawCellOverview(startX, startY, columns, rows, offsetX, offsetY, size, palette);
    drawRegionLines(startX, startY, columns, rows, offsetX, offsetY, size, palette);
    context.globalAlpha = 1;
    if (size >= 6) drawBlockedProgress(size);
    drawEffects(performance.now(), size);
    drawThemeTransition(performance.now());
    const centerX = Math.floor(camera.x + canvasWidth / size / 2);
    const centerY = Math.floor(camera.y + canvasHeight / size / 2);
    const { rx, ry } = cellRegion(centerX, centerY);
    coordinatesElement.textContent = `Region ${rx}, ${ry}`;
    return;
  }

  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const x = startX + col;
    const y = startY + row;
    const px = offsetX + col * size;
    const py = offsetY + row * size;
    const region = regionForCell(x, y);
    const blocked = region.state.blocked;
    const index = localIndex(x, y, region.rx, region.ry);
    const revealed = isRevealed(x, y);
    const flagged = isFlagged(x, y);
    const mine = isMine(x, y);
    const number = revealed ? countMines(x, y) : 0;

    if (flagged) {
      context.fillStyle = palette.map;
      context.fillRect(px, py, size, size);
      context.globalAlpha = .35;
      context.fillStyle = palette.accent;
      context.fillRect(px, py, size, size);
      context.globalAlpha = 1;
    } else {
      context.fillStyle = revealed ? (region.state.cleared ? palette.cleared : palette.revealed) : palette.hidden;
      context.fillRect(px, py, size, size);
    }

    if (flagged) {
      context.fillStyle = palette.accent;
      context.font = `700 ${Math.max(11, size * .57)}px "DM Sans",sans-serif`;
      context.textAlign = 'center'; context.textBaseline = 'middle';
      context.shadowColor = palette.glow ? palette.accent : 'transparent';
      context.shadowBlur = palette.glow ? size * .2 : 0;
      context.fillText('\u2691', px + size / 2, py + size / 2 + 1);
      context.shadowBlur = 0;
    } else if (revealed && number > 0) {
      context.fillStyle = palette.numbers[number]; context.font = `800 ${Math.max(10, size * .54)}px "DM Sans",sans-serif`; context.textAlign = 'center'; context.textBaseline = 'middle';
      context.shadowColor = palette.glow ? palette.numbers[number] : 'transparent'; context.shadowBlur = palette.glow ? size * .14 : 0;
      context.fillText(String(number), px + size / 2, py + size / 2 + 1); context.shadowBlur = 0;
    } else if (revealed && mine && (!blocked || flagged)) {
      context.fillStyle = '#f26e76'; context.beginPath(); context.arc(px + size / 2, py + size / 2, Math.max(3, size * .23), 0, Math.PI * 2); context.fill();
    }

    if (index === region.keyIndex && !region.state.keyFound) {
      const iconSize = size * .88;
      const scale = iconSize / 24;
      const iconLeft = px + (size - 17.7 * scale) / 2 - 4 * scale;
      const iconTop = py + (size - 15.7 * scale) / 2 - 6 * scale;
      context.save();
      context.strokeStyle = palette.accent; context.lineWidth = Math.max(1.1, size * .065); context.lineCap = 'round'; context.lineJoin = 'round';
      context.beginPath();
      context.arc(iconLeft + 8.5 * scale, iconTop + 10.5 * scale, 4.5 * scale, 0, Math.PI * 2);
      context.moveTo(iconLeft + 11.7 * scale, iconTop + 13.7 * scale);
      context.lineTo(iconLeft + 19.7 * scale, iconTop + 21.7 * scale);
      context.lineTo(iconLeft + 21.7 * scale, iconTop + 19.7 * scale);
      context.lineTo(iconLeft + 19.7 * scale, iconTop + 17.7 * scale);
      context.lineTo(iconLeft + 21.5 * scale, iconTop + 15.9 * scale);
      context.lineTo(iconLeft + 18.5 * scale, iconTop + 12.9 * scale);
      context.stroke();
      context.restore();
    }

    if (blocked) {
      context.save();
      context.fillStyle = 'rgba(5, 8, 12, .34)';
      context.fillRect(px, py, size, size);
      context.globalAlpha = .32;
      context.strokeStyle = palette.border;
      context.lineWidth = 1;
      context.beginPath(); context.moveTo(px + 3, py + size - 3); context.lineTo(px + size - 3, py + 3); context.stroke();
      context.restore();
    }

    context.strokeStyle = flagged ? palette.accent : revealed ? palette.gridRevealed : palette.gridHidden;
    context.lineWidth = 1;
    context.strokeRect(px + .5, py + .5, size - 1, size - 1);
  }

  drawRegionLines(startX, startY, columns, rows, offsetX, offsetY, size, palette);
  context.globalAlpha = 1;
  drawBlockedProgress(size);
  drawEffects(performance.now(), size);
  drawThemeTransition(performance.now());
  const centerX = Math.floor(camera.x + canvasWidth / size / 2);
  const centerY = Math.floor(camera.y + canvasHeight / size / 2);
  const { rx, ry } = cellRegion(centerX, centerY);
  coordinatesElement.textContent = `Region ${rx}, ${ry}`;
}

function drawThemeTransition(now) {
  if (!themeTransition) return;
  const progress = Math.min(1, (now - themeTransition.start) / themeTransition.duration);
  if (progress >= 1) {
    themeTransition = null;
    return;
  }
  context.save();
  context.globalAlpha = 1 - progress;
  context.drawImage(themeTransition.canvas, 0, 0, canvasWidth, canvasHeight);
  context.restore();
  requestDraw();
}

function drawCellOverview(startX, startY, columns, rows, offsetX, offsetY, size, palette) {
  const image = context.createImageData(columns, rows);
  const rgb = color => {
    const value = Number.parseInt(color.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  };
  const colors = {
    hidden: rgb(palette.hidden), revealed: rgb(palette.revealed),
    cleared: rgb(palette.cleared), flagged: rgb(palette.accent), blocked: [20, 25, 34],
  };
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const region = regionForCell(startX + col, startY + row);
    const index = localIndex(startX + col, startY + row, region.rx, region.ry);
    const color = region.state.blocked ? colors.blocked
      : region.state.flagged.includes(index) ? colors.flagged
      : region.state.revealed.includes(index) ? (region.state.cleared ? colors.cleared : colors.revealed)
      : colors.hidden;
    const offset = (row * columns + col) * 4;
    image.data[offset] = color[0]; image.data[offset + 1] = color[1];
    image.data[offset + 2] = color[2]; image.data[offset + 3] = 255;
  }
  if (overviewCanvas.width !== columns || overviewCanvas.height !== rows) {
    overviewCanvas.width = columns;
    overviewCanvas.height = rows;
  }
  overviewContext.putImageData(image, 0, 0);
  context.imageSmoothingEnabled = false;
  context.drawImage(overviewCanvas, offsetX, offsetY, columns * size, rows * size);
  context.imageSmoothingEnabled = true;
}

function drawRegionLines(startX, startY, columns, rows, offsetX, offsetY, size, palette) {
  // Region borders show the 12-by-12 structure.
  const regionLineWidth = Math.max(2.2, Math.min(3.8, size * .105));
  for (let col = 0; col <= columns; col++) {
    if ((startX + col) % REGION_SIZE !== 0) continue;
    const px = offsetX + col * size;
    context.globalAlpha = .94;
    context.strokeStyle = palette.map; context.lineWidth = regionLineWidth + 1.2;
    context.beginPath(); context.moveTo(px, 0); context.lineTo(px, canvasHeight); context.stroke();
    context.strokeStyle = palette.accent; context.lineWidth = regionLineWidth;
    context.beginPath(); context.moveTo(px, 0); context.lineTo(px, canvasHeight); context.stroke();
  }
  for (let row = 0; row <= rows; row++) {
    if ((startY + row) % REGION_SIZE !== 0) continue;
    const py = offsetY + row * size;
    context.globalAlpha = .94;
    context.strokeStyle = palette.map; context.lineWidth = regionLineWidth + 1.2;
    context.beginPath(); context.moveTo(0, py); context.lineTo(canvasWidth, py); context.stroke();
    context.strokeStyle = palette.accent; context.lineWidth = regionLineWidth;
    context.beginPath(); context.moveTo(0, py); context.lineTo(canvasWidth, py); context.stroke();
  }
}

function drawBlockedProgress(size) {
  const palette = THEMES[world.theme] || THEMES.midnight;
  const firstRx = floorDiv(Math.floor(camera.x), REGION_SIZE);
  const firstRy = floorDiv(Math.floor(camera.y), REGION_SIZE);
  const lastRx = floorDiv(Math.floor(camera.x + canvasWidth / size), REGION_SIZE);
  const lastRy = floorDiv(Math.floor(camera.y + canvasHeight / size), REGION_SIZE);
  for (let ry = firstRy; ry <= lastRy; ry++) for (let rx = firstRx; rx <= lastRx; rx++) {
    const region = getRegion(rx, ry);
    if (!region.state.blocked) continue;
    const left = (rx * REGION_SIZE - camera.x) * size;
    const top = (ry * REGION_SIZE - camera.y) * size;
    const dimension = REGION_SIZE * size;
    if (left + dimension <= 0 || top + dimension <= 0 || left >= canvasWidth || top >= canvasHeight) continue;
    const centerX = left + dimension / 2;
    const centerY = top + dimension / 2;
    const blockedColor = palette.numbers[3] || '#ff6472';
    context.save();
    context.fillStyle = palette.overlay;
    context.strokeStyle = palette.gridHidden;
    context.lineWidth = 1;
    roundedRect(context, centerX - 48, centerY - 48, 96, 96, 11);
    context.fill(); context.stroke();
    context.fillStyle = palette.text;
    context.font = '800 13px "DM Sans",sans-serif';
    context.textAlign = 'center'; context.textBaseline = 'middle';
    let secured = 0;
    const tileSize = 13;
    const tileGap = 3;
    const gridSize = tileSize * 3 + tileGap * 2;
    const gridLeft = centerX - gridSize / 2;
    const gridTop = centerY - gridSize / 2 - 1;
    for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
      const tileX = gridLeft + col * (tileSize + tileGap);
      const tileY = gridTop + row * (tileSize + tileGap);
      if (row === 1 && col === 1) {
        context.fillStyle = palette.overlay;
        context.strokeStyle = palette.accent;
        context.lineWidth = 1.5;
        context.fillRect(tileX, tileY, tileSize, tileSize);
        context.strokeRect(tileX + .5, tileY + .5, tileSize - 1, tileSize - 1);
        context.beginPath();
        context.moveTo(tileX + 3, tileY + 10); context.lineTo(tileX + 10, tileY + 3);
        context.moveTo(tileX + 3, tileY + 3); context.lineTo(tileX + 10, tileY + 10);
        context.stroke();
        continue;
      }
      const state = getRegion(rx + col - 1, ry + row - 1).state;
      if (state.blocked || state.cleared) secured++;
      context.fillStyle = state.cleared ? palette.accent : state.blocked ? blockedColor : palette.inactive;
      context.fillRect(tileX, tileY, tileSize, tileSize);
      context.strokeStyle = palette.overlay;
      context.lineWidth = 1;
      context.strokeRect(tileX + .5, tileY + .5, tileSize - 1, tileSize - 1);
    }
    context.fillStyle = palette.text;
    context.font = '800 11px "DM Sans",sans-serif';
    context.fillText(`${secured}/8 secured`, centerX, centerY - 36);
    const legend = [
      { x: centerX - 29, color: palette.accent, label: 'cleared' },
      { x: centerX, color: blockedColor, label: 'blocked' },
      { x: centerX + 29, color: palette.inactive, label: 'open' },
    ];
    context.font = '600 6px "DM Sans",sans-serif';
    context.textBaseline = 'middle';
    for (const item of legend) {
      context.fillStyle = item.color;
      context.beginPath(); context.arc(item.x - 10, centerY + 36, 2, 0, Math.PI * 2); context.fill();
      context.fillStyle = palette.muted;
      context.textAlign = 'left';
      context.fillText(item.label, item.x - 6, centerY + 36);
    }
    context.restore();
  }
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawEffects(now, size) {
  const palette = THEMES[world.theme] || THEMES.midnight;
  effects = effects.filter(effect => now - effect.start < effect.duration);
  for (const effect of effects) {
    const progress = Math.min(1, (now - effect.start) / effect.duration);
    context.save();
    if (effect.kind === 'reveal' || effect.kind === 'flag' || effect.kind === 'unflag' || effect.kind === 'chord') {
      const px = (effect.x - camera.x + .5) * size;
      const py = (effect.y - camera.y + .5) * size;
      const color = effect.kind === 'flag' ? palette.accent : effect.kind === 'unflag' ? palette.muted : effect.kind === 'chord' ? palette.border : palette.accent;
      const waves = effect.kind === 'chord' ? 3 : 1;
      for (let wave = 0; wave < waves; wave++) {
        const waveProgress = Math.max(0, Math.min(1, progress * 1.45 - wave * .2));
        if (waveProgress <= 0) continue;
        context.globalAlpha = (1 - waveProgress) * (effect.kind === 'chord' ? .85 : .75);
        context.strokeStyle = color;
        context.lineWidth = effect.kind === 'chord' ? 2.2 : 1.8;
        context.beginPath();
        context.arc(px, py, size * (.14 + waveProgress * (effect.kind === 'chord' ? 1.15 : .55)), 0, Math.PI * 2);
        context.stroke();
      }
      if (effect.kind === 'flag') {
        context.globalAlpha = (1 - progress) * .8;
        context.strokeStyle = color;
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(px, py, size * (.25 + progress * .35), -Math.PI * .25, Math.PI * 1.25);
        context.stroke();
      }
    } else {
      const left = (effect.rx * REGION_SIZE - camera.x) * size;
      const top = (effect.ry * REGION_SIZE - camera.y) * size;
      const dimension = REGION_SIZE * size;
      const color = effect.kind === 'loss' ? '#ff6472' : palette.border;
      const pulse = Math.sin(progress * Math.PI * (effect.kind === 'loss' ? 4 : 2));
      context.globalAlpha = (1 - progress) * (effect.kind === 'loss' ? .16 : .12);
      context.fillStyle = color;
      context.fillRect(left, top, dimension, dimension);
      context.globalAlpha = (1 - progress) * (.55 + Math.max(0, pulse) * .4);
      context.strokeStyle = color;
      context.lineWidth = 2 + Math.max(0, pulse) * 2;
      context.strokeRect(left + 1, top + 1, dimension - 2, dimension - 2);

      const centerX = left + dimension / 2;
      const centerY = top + dimension / 2;
      context.globalAlpha = (1 - progress) * .7;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(centerX, centerY, dimension * (.08 + progress * .74), 0, Math.PI * 2);
      context.stroke();

      for (const particle of effect.particles) {
        const seconds = progress * effect.duration / 1000;
        const px = (particle.x + particle.vx * seconds - camera.x) * size;
        const py = (particle.y + particle.vy * seconds + 4 * seconds * seconds - camera.y) * size;
        context.globalAlpha = (1 - progress) * .95;
        context.fillStyle = particle.color;
        context.translate(px, py);
        context.rotate(particle.spin + progress * 5);
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 1.8);
        context.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      }
    }
    context.restore();
  }
  if (chargeState) {
    const progress = Math.min(1, (now - chargeState.start) / CHORD_HOLD_MS);
    const px = (chargeState.x - camera.x + .5) * size;
    const py = (chargeState.y - camera.y + .5) * size;
    const radius = size * .66;
    context.save();
    context.globalAlpha = .9;
    context.lineWidth = Math.max(2, size * .1);
    context.strokeStyle = '#63728a';
    context.beginPath(); context.arc(px, py, radius, 0, Math.PI * 2); context.stroke();
    context.strokeStyle = progress >= 1 ? '#c8f27d' : '#93dfc5';
    context.lineCap = 'round';
    context.beginPath(); context.arc(px, py, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress); context.stroke();
    context.restore();
  }
}

function pointerCell(event) {
  const rect = canvas.getBoundingClientRect();
  const size = cellSize();
  return { x: Math.floor(camera.x + (event.clientX - rect.left) / size), y: Math.floor(camera.y + (event.clientY - rect.top) / size) };
}

function onWheel(event) {
  event.preventDefault();
  let deltaX = event.deltaX;
  let deltaY = event.deltaY;
  if (event.deltaMode === 1) { deltaX *= 16; deltaY *= 16; }
  else if (event.deltaMode === 2) { deltaX *= canvasWidth; deltaY *= canvasHeight; }

  const rect = canvas.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const pointerY = event.clientY - rect.top;
  if (event.ctrlKey || event.metaKey || world.controlMode !== 'trackpad') {
    if (deltaY !== 0) {
      const sensitivity = event.ctrlKey || event.metaKey ? .003 : .0015;
      zoomAt(Math.exp(-deltaY * sensitivity), pointerX, pointerY);
    }
  } else {
    camera.x += deltaX / cellSize();
    camera.y += deltaY / cellSize();
    requestDraw();
    scheduleSave();
  }
}

function onPointerDown(event) {
  if (event.button !== 0 && event.button !== 2) return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  const cell = pointerCell(event);
  drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY, cell, button: event.button, moved: false };
  chordFired = false;
  if (event.button === 0 && !isBlocked(cell.x, cell.y) && isRevealed(cell.x, cell.y) && countMines(cell.x, cell.y) > 0) {
    chargeState = { x: cell.x, y: cell.y, start: performance.now() };
    requestEffectFrame();
    chordTimer = setTimeout(() => {
      if (!drag || drag.pointerId !== event.pointerId || drag.moved) return;
      chordFired = true;
      chord(cell.x, cell.y);
    }, CHORD_HOLD_MS);
  }
}

function onPointerMove(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.moved && distance > 6) {
    drag.moved = true;
    clearTimeout(chordTimer);
    chargeState = null;
    mapWrap.classList.add('dragging');
    document.querySelector('#map-tip').classList.add('hidden');
  }
  if (drag.moved) {
    camera.x -= (event.clientX - drag.lastX) / cellSize();
    camera.y -= (event.clientY - drag.lastY) / cellSize();
    drag.lastX = event.clientX; drag.lastY = event.clientY;
    requestDraw();
  }
}

function onPointerUp(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  clearTimeout(chordTimer);
  chargeState = null;
  const finished = drag;
  drag = null;
  mapWrap.classList.remove('dragging');
  if (!finished.moved && !chordFired) {
    if (keyMode && finished.button === 0) {
      const { rx, ry } = cellRegion(finished.cell.x, finished.cell.y);
      useKeyOnRegion(rx, ry);
    } else if (finished.button === 2) flag(finished.cell.x, finished.cell.y);
    else {
      const isFirstClick = !world.firstClickDone;
      if (isFirstClick) {
        prepareFirstClick(finished.cell.x, finished.cell.y);
        statusElement.textContent = 'Safe opening ready';
      }
      reveal(finished.cell.x, finished.cell.y, new Set(), true, isFirstClick);
      saveWorld();
      draw();
    }
  }
  chordFired = false;
  if (finished.moved) scheduleSave();
}

function onPointerCancel(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  clearTimeout(chordTimer);
  drag = null;
  chargeState = null;
  chordFired = false;
  mapWrap.classList.remove('dragging');
  requestDraw();
  scheduleSave();
}

function initializeWorld() {
  world = loadWorld();
  world.keys ||= 0;
  if (!['mouse', 'trackpad'].includes(world.controlMode)) world.controlMode = 'mouse';
  keyMode = false;
  soundEnabled = world.soundOn !== false;
  updateSoundButton();
  updateControlModeButton();
  applyTheme(world.theme || 'midnight', false, Boolean(world.randomTheme));
  zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, world.zoom || 1));
  updateZoomControls();
  const rect = canvas.getBoundingClientRect();
  camera = world.camera ? { ...world.camera } : { x: 8 - rect.width / (BASE_CELL_SIZE * zoom * 2), y: 8 - rect.height / (BASE_CELL_SIZE * zoom * 2) };
  regionCache.clear();
  updateStats();
  statusElement.textContent = 'World ready';
}

function resetWorld() {
  effects = [];
  chargeState = null;
  if (drawFrame !== null) cancelAnimationFrame(drawFrame);
  drawFrame = null;
  world = freshWorld();
  keyMode = false;
  soundEnabled = true;
  updateSoundButton();
  updateControlModeButton();
  applyTheme('midnight', false);
  zoom = 1;
  updateZoomControls();
  camera = { x: 8 - canvasWidth / cellSize() / 2, y: 8 - canvasHeight / cellSize() / 2 };
  regionCache.clear();
  statusElement.textContent = 'New world ready';
  saveWorld();
  draw();
}

canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerCancel);
canvas.addEventListener('wheel', onWheel, { passive: false });
canvas.addEventListener('contextmenu', event => event.preventDefault());
zoomOutButton.addEventListener('click', () => zoomAt(1 / 1.2));
zoomInButton.addEventListener('click', () => zoomAt(1.2));
document.querySelector('#reset-world').addEventListener('click', () => resetDialog.showModal());
soundButton.addEventListener('click', toggleSound);
controlModeButton.addEventListener('click', toggleControlMode);
keyButton.addEventListener('click', () => {
  if (!(world.keys > 0)) return;
  keyMode = !keyMode;
  statusElement.textContent = keyMode ? 'Choose a blocked region to reopen with a key' : 'Key use cancelled';
  updateStats();
});
themeToggle.addEventListener('click', toggleThemeMenu);
document.addEventListener('pointerdown', event => {
  if (!themePicker.contains(event.target)) closeThemeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeThemeMenu();
    if (keyMode) {
      keyMode = false;
      statusElement.textContent = 'Key use cancelled';
      updateStats();
    }
  }
});
document.querySelector('#confirm-reset').addEventListener('click', event => {
  event.preventDefault();
  resetDialog.close('reset');
  resetWorld();
});
window.addEventListener('resize', resizeCanvas);
window.addEventListener('beforeunload', saveWorld);

buildThemeGallery();
initializeWorld();
resizeCanvas();
tipTimeout = setTimeout(() => document.querySelector('#map-tip').classList.add('hidden'), 9000);
