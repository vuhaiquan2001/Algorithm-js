class MapGenerator {
  constructor(seed) {
    this.seed = seed;
    this.random = this.mulberry32(seed);
    this.width = 100;
    this.height = 100;
    this.heightMap = this.generateHeightMap();
  }

  // Hàm sinh số ngẫu nhiên dựa trên seed
  mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Sinh bản đồ độ cao sử dụng Perlin Noise
  generateHeightMap() {
    const heightMap = Array(this.height)
      .fill()
      .map(() => Array(this.width).fill(0));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Sử dụng seed để sinh số ngẫu nhiên
        const noise = this.generatePerlinNoise(x, y);
        heightMap[y][x] = noise;
      }
    }

    return heightMap;
  }

  generatePerlinNoise(x, y) {
    // Triển khai đơn giản của Perlin Noise
    const freq = 0.1;
    return Math.sin(x * freq) * Math.cos(y * freq);
  }

  // Phân loại địa hình dựa trên độ cao
  classifyTerrain() {
    return this.heightMap.map((row) =>
      row.map((height) => {
        if (height > 0.8) return "mountain";
        if (height > 0.5) return "hill";
        if (height > 0.2) return "plain";
        return "water";
      })
    );
  }

  // Quy tắc kết nối giữa các địa hình
  generateTerrainRules() {
    return {
      mountain: {
        connections: {
          '{"dx":0,"dy":-1}': ["mountain", "hill", "forest"],
          '{"dx":1,"dy":0}': ["mountain", "hill", "forest"],
        },
      },
      hill: {
        connections: {
          '{"dx":0,"dy":-1}': ["mountain", "forest", "plain"],
          '{"dx":1,"dy":0}': ["mountain", "forest", "plain"],
        },
      },
      forest: {
        connections: {
          '{"dx":0,"dy":-1}': ["hill", "forest", "plain"],
          '{"dx":1,"dy":0}': ["hill", "forest", "plain"],
        },
      },
      plain: {
        connections: {
          '{"dx":0,"dy":-1}': ["forest", "settlement", "plain"],
          '{"dx":1,"dy":0}': ["forest", "settlement", "plain"],
        },
      },
      settlement: {
        connections: {
          '{"dx":0,"dy":-1}': ["plain", "settlement"],
          '{"dx":1,"dy":0}': ["plain", "settlement"],
        },
      },
      water: {
        connections: {
          '{"dx":0,"dy":-1}': ["water", "river"],
          '{"dx":1,"dy":0}': ["water", "river"],
        },
      },
      river: {
        connections: {
          '{"dx":0,"dy":-1}': ["mountain", "hill", "water"],
          '{"dx":1,"dy":0}': ["mountain", "hill", "water"],
        },
      },
    };
  }

  // Thêm logic cho sông
  generateRiverPath() {
    // Tìm điểm cao nhất (núi) làm nguồn sông
    let maxHeight = -Infinity;
    let riverSource = { x: 0, y: 0 };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.heightMap[y][x] > maxHeight) {
          maxHeight = this.heightMap[y][x];
          riverSource = { x, y };
        }
      }
    }

    // Logic sinh đường đi của sông
    let currentPos = riverSource;
    const riverPath = [currentPos];

    while (this.heightMap[currentPos.y][currentPos.x] > 0) {
      // Di chuyển xuống theo độ dốc
      const nextPos = this.findLowestNeighbor(currentPos);
      riverPath.push(nextPos);
      currentPos = nextPos;
    }

    return riverPath;
  }

  findLowestNeighbor(pos) {
    const neighbors = [
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
    ];

    return neighbors.reduce((lowest, neighbor) => {
      if (
        this.isValidPos(neighbor) &&
        this.heightMap[neighbor.y][neighbor.x] < this.heightMap[lowest.y][lowest.x]
      ) {
        return neighbor;
      }
      return lowest;
    }, pos);
  }

  isValidPos(pos) {
    return pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height;
  }

  // Sinh khu dân cư
  generateSettlements(count = 5) {
    const settlements = [];
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.floor(this.random() * this.width);
        y = Math.floor(this.random() * this.height);
      } while (
        this.heightMap[y][x] < 0.2 || // Tránh vùng nước
        this.heightMap[y][x] > 0.8 || // Tránh núi
        settlements.some((s) => Math.hypot(s.x - x, s.y - y) < 10)
      );

      settlements.push({ x, y });
    }
    return settlements;
  }

  // Sinh đường kết nối giữa các khu dân cư
  generateRoads(settlements) {
    // Thuật toán Delaunay triangulation
    // để tạo kết nối giữa các điểm dân cư
    // Chi tiết triển khai sẽ phức tạp
    return [];
  }

  generateMap() {
    // Bước 1: Sinh địa hình
    const terrainMap = this.classifyTerrain();

    // Bước 2: Sinh sông
    const riverPath = this.generateRiverPath();

    // Bước 3: Sinh khu dân cư
    const settlements = this.generateSettlements();

    // Bước 4: Sinh đường
    const roads = this.generateRoads(settlements);

    return {
      terrain: terrainMap,
      river: riverPath,
      settlements: settlements,
      roads: roads,
    };
  }
}

// Sử dụng
const seed = 12345; // Seed cố định
const mapGenerator = new MapGenerator(seed);
const map = mapGenerator.generateMap();
console.log(map);
