import { SongRegistry } from "@/save-system/song-registry";
import { assert } from "@vue/compiler-core";

const testRegistryData = () => ["this","is","test","data","don't","mind","me",".","It's","only","temporary",",","soon","better","stuff","will","be","here"].slice();
const neverInRegistry = "This text is not found in the registry data";
const testData = "This text could be in the registry from another test";
const newRegistry = () => new SongRegistry(testRegistryData()).testMode();

test("constructor is working", () => {
    let isSuccessful = true;
    const testReg = newRegistry();
    for(var path of testRegistryData()) {
        if(!testReg.contains(path)) {
            isSuccessful = false;
            break;
        }
    }
    assert(isSuccessful);
});

describe("push is working", () => {
    test("song gets added", () => {
        const testReg = newRegistry();
        if(testReg.contains(testData)) {
            assert(false);
        }
        testReg.push(testData);
        assert(testReg.contains(testData));
    });
    test("can't push duplicate", async () => {
        const testReg = newRegistry();
        await expect(testReg.push(testRegistryData()[0]))
        .rejects.toThrow();
    });
    test("can't move nonexistent item", async () => {
        const testReg = newRegistry();
        await expect(testReg.moveUp(neverInRegistry))
        .rejects.toThrow();
    });
});

describe("remove is working", () => {
    test("song is removed", () => {
        const testReg = newRegistry();
        let isSuccessful = true;
        for(var path of testRegistryData()) {
            testReg.remove(path);
            if(testReg.contains(path)) {
                isSuccessful = false;
                break;
            }
        }
        assert(isSuccessful);
    });
    test("can't remove nonexistent song", async () => {
        const testReg = newRegistry();
        await expect(testReg.remove(neverInRegistry))
        .rejects.toThrow();
    });
});

describe("replace is working", () => {
    test("replace is successful", () => {
            const testReg = newRegistry();
            if(testRegistryData()[0] === testData) {
                assert(false);
            }
            testReg.replace(testRegistryData()[0],testData);
            assert(testReg.getIndexOf(testData) === 0);
        }
    );
    test("can't replace nonexistent song from registry", async () => {
            const testReg = newRegistry();
            await expect(testReg.replace(neverInRegistry,testRegistryData()[1]))
            .rejects.toThrow();
    });
    test("can't replace song with a duplicate entry", async () => {
        const testReg = newRegistry();
        await expect(testReg.replace(testRegistryData()[0],testRegistryData()[1]))
        .rejects.toThrow();
    });
});

test("contains is working", () => {
    const testReg = newRegistry();
    let isSuccessful = true;
    for(var path of testRegistryData()) {
        if(!testReg.contains(path)) {
            isSuccessful = false;
            break;
        }
    }
    assert(isSuccessful);
});

describe("moveUp is working", () => {
    test("entry moves up", () => {
        const testReg = newRegistry();
        testReg.moveUp(testRegistryData()[1]);
        assert(testReg.getIndexOf(testRegistryData()[0]) === 1);
    });
    test("can't move first entry", async () => {
        const testReg = newRegistry();
        await expect(testReg.moveUp(testRegistryData()[0]))
        .rejects.toThrow();
    });
    test("can't move nonexistent entry", async () => {
        const testReg = newRegistry();
        await expect(testReg.moveUp(neverInRegistry))
        .rejects.toThrow();
    });
});
describe("moveDown is working", () => {
    test("entry moves down", () => {
        const testReg = newRegistry();
        testReg.moveDown(testRegistryData()[0]);
        const firstNumMoved = testReg.getIndexOf(testRegistryData()[0]) === 1;
        const secondNumMoved = testReg.getIndexOf(testRegistryData()[1]) === 0;
        assert(firstNumMoved && secondNumMoved);
    });
    test("can't move last entry", async () => {
        const testReg = newRegistry();
        await expect(testReg.moveDown(testRegistryData()[testRegistryData.length-1]))
        .rejects.toThrow();
    });
    test("can't move nonexistent entry", async () => {
        const testReg = newRegistry();
        await expect(testReg.moveDown(neverInRegistry))
        .rejects.toThrow();
    });
});
test("getRegistry is working", () => {
        const testReg = newRegistry();
        assert(testReg.getRegistry().values === testRegistryData().values);
    });
test.todo("cacheSongs is working");