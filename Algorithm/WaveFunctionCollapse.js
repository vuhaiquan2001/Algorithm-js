class WaveFunctionCollapse {
  constructor(rules, tileSet, gridWidth, gridHeight) {
    this.rules = rules;
    this.tileSet = tileSet;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.grid = this.initializeGrid();
  }

  initializeGrid() {
    // Khởi tạo lưới với tất cả các ô chưa được xác định
    return Array.from({ length: this.gridHeight }, () =>
      Array.from({ length: this.gridWidth }, () => [...this.tileSet])
    );
  }

  findLowestEntropyCell() {
    let minEntropy = Infinity;
    let candidates = [];

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const cellOptions = this.grid[y][x];

        // Chỉ xem xét các ô chưa được xác định hoàn toàn
        if (cellOptions.length > 1) {
          if (cellOptions.length < minEntropy) {
            minEntropy = cellOptions.length;
            candidates = [{ x, y }];
          } else if (cellOptions.length === minEntropy) {
            candidates.push({ x, y });
          }
        }
      }
    }

    // Kiểm tra nếu không có ô nào phù hợp
    if (candidates.length === 0) {
      return null; // Hoặc throw new Error để xử lý rõ ràng
    }

    // Chọn ngẫu nhiên từ các ứng viên
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  propagate(x, y) {
    const directions = [
      { dx: 0, dy: -1 }, // Trên
      { dx: 1, dy: 0 }, // Phải
      { dx: 0, dy: 1 }, // Dưới
      { dx: -1, dy: 0 }, // Trái
    ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // Kiểm tra giới hạn lưới
      if (newX >= 0 && newX < this.gridWidth && newY >= 0 && newY < this.gridHeight) {
        const currentCell = this.grid[y][x];
        const neighborCell = this.grid[newY][newX];

        // Lọc các ô láng giềng dựa trên quy tắc
        const validNeighbors = neighborCell.filter((neighbor) =>
          currentCell.some((current) => this.isValidConnection(current, neighbor, { dx, dy }))
        );

        // Cập nhật ô láng giềng
        this.grid[newY][newX] = validNeighbors;
      }
    }
  }

  isValidConnection(currentTile, neighborTile, direction) {
    // Kiểm tra xem hai ô có thể kết nối được không
    return (
      this.rules[currentTile]?.connections[JSON.stringify(direction)]?.includes(neighborTile) ||
      false
    );
  }

  generate() {
    while (!this.isComplete()) {
      const cell = this.findLowestEntropyCell();

      // Kiểm tra nếu không còn ô nào để xử lý
      if (cell === null) {
        break;
      }

      const { x, y } = cell;

      // Chọn ngẫu nhiên một trạng thái
      const selectedTile = this.grid[y][x][Math.floor(Math.random() * this.grid[y][x].length)];

      // Thu hẹp ô về trạng thái đã chọn
      this.grid[y][x] = [selectedTile];

      // Lan truyền ràng buộc
      this.propagate(x, y);
    }

    return this.grid;
  }

  isComplete() {
    // Kiểm tra xem tất cả các ô đã được xác định
    return this.grid.every((row) => row.every((cell) => cell.length === 1));
  }
}

// Ví dụ về quy tắc và tập ô
const rules = {
  grass: {
    connections: {
      '{"dx":0,"dy":-1}': ["grass", "tree"], // Các ô phía trên
      '{"dx":1,"dy":0}': ["grass", "tree"], // Các ô bên phải
    },
  },
  tree: {
    connections: {
      '{"dx":0,"dy":-1}': ["grass"],
      '{"dx":1,"dy":0}': ["grass"],
    },
  },
};

const tileSet = ["grass", "tree"];

// Tạo và sinh dữ liệu
const wfc = new WaveFunctionCollapse(rules, tileSet, 10, 10);
const result = wfc.generate();

console.log(result);
